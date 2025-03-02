const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "pizza_store"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
});

app.post("/checkout", async (req, res) => {
    try {
        const { userId, paymentMethod, cardNumber, expiryDate, paypalEmail, googlePayAccount, totalAmount, cartItems } = req.body;

        // Start a transaction
        await db.promise().beginTransaction();

        // 1. Insert payment record
        let encryptedCardNumber = null;
        if (cardNumber) {
            encryptedCardNumber = await bcrypt.hash(cardNumber, 10);
        }

        const paymentQuery = `
            INSERT INTO payments (user_id, payment_method, card_number, expiry_date, paypal_email, google_pay_account, total_amount)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const [paymentResult] = await db.promise().execute(paymentQuery, [
            userId,
            paymentMethod,
            encryptedCardNumber,
            expiryDate,
            paypalEmail,
            googlePayAccount,
            totalAmount
        ]);

        // 2. Create order record
        const orderQuery = `
            INSERT INTO orders (user_id, payment_id, total_amount)
            VALUES (?, ?, ?)`;

        const [orderResult] = await db.promise().execute(orderQuery, [
            userId,
            paymentResult.insertId,
            totalAmount
        ]);

        // 3. Insert order items
        const orderItemsQuery = `
            INSERT INTO order_items (order_id, pizza_type, toppings, price)
            VALUES (?, ?, ?, ?)`;

        for (const item of cartItems) {
            await db.promise().execute(orderItemsQuery, [
                orderResult.insertId,
                item.pizzaType,
                JSON.stringify(item.toppings),
                item.price
            ]);
        }

        // Commit the transaction
        await db.promise().commit();

        res.status(201).json({ 
            message: "Order processed successfully",
            orderId: orderResult.insertId
        });
    } catch (error) {
        // Rollback in case of error
        await db.promise().rollback();
        console.error('Checkout Error:', error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
