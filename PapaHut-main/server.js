require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
    try {
        const { cart } = req.body;

        const lineItems = cart.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name, description: item.topping },
                unit_amount: Math.round(item.price * 100), // Convert to cents
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "paypal", "google_pay"], // Enables more payment methods
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5500/success.html",
            cancel_url: "http://localhost:5500/cancel.html",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
