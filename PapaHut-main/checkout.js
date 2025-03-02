document.addEventListener("DOMContentLoaded", function () {
    const paymentMethodSelect = document.getElementById("payment-method");
    const paymentForm = document.getElementById("payment-form");
    const creditCardFields = document.getElementById("credit-card-fields");
    const paypalFields = document.getElementById("paypal-fields");
    const googlePayFields = document.getElementById("google-pay-fields");
    const cartTotalElement = document.getElementById("cart-total");

    function sanitizeInput(input) {
        const div = document.createElement("div");
        div.textContent = input;
        return div.innerHTML;
    }

    // Retrieve and display total price from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.textContent = total.toFixed(2);

    function updatePaymentFields() {
        creditCardFields.classList.add("hidden");
        paypalFields.classList.add("hidden");
        googlePayFields.classList.add("hidden");

        paymentForm.classList.remove("hidden");
        const selectedMethod = paymentMethodSelect.value;
        if (selectedMethod === "credit-card") {
            creditCardFields.classList.remove("hidden");
        } else if (selectedMethod === "paypal") {
            paypalFields.classList.remove("hidden");
            paypalFields.innerHTML = "<p>You have selected PayPal. Please proceed with your PayPal email.</p>" +
                "<label for='paypal-email'>PayPal Email:</label>" +
                "<input type='email' id='paypal-email' placeholder='your-email@example.com' oninput='this.value=sanitizeInput(this.value)'>";
        } else if (selectedMethod === "google-pay") {
            googlePayFields.classList.remove("hidden");
            googlePayFields.innerHTML = "<p>You have selected Google Pay. Please proceed with your Google Pay account.</p>";
        }
    }

    paymentMethodSelect.addEventListener("change", updatePaymentFields);

    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const emailInput = document.getElementById("paypal-email");
        if (emailInput) {
            emailInput.value = sanitizeInput(emailInput.value);
        }
        alert("Payment processing... Thank you for your order!");
        localStorage.removeItem("cart"); // Clear cart after payment
        window.location.href = "confirmation.html";
    });

    updatePaymentFields(); // Initialize fields on page load
});

document.getElementById("payment-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const userId = 1; // Replace with actual user ID
    const paymentMethod = document.getElementById("payment-method").value;
    const totalAmount = parseFloat(document.getElementById("cart-total").textContent);

    let cardNumber = document.getElementById("card-number") ?.value || null;
    let expiryDate = document.getElementById("expiry") ?.value || null;
    let paypalEmail = document.getElementById("paypal-email") ?.value || null;
    let googlePayAccount = paymentMethod === "google-pay" ? "Google Pay Selected" : null;

    const paymentData = { userId, paymentMethod, cardNumber, expiryDate, paypalEmail, googlePayAccount, totalAmount };

    const response = await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData)
    });

    if (response.ok) {
        alert("Payment processed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "confirmation.html";
    } else {
        alert("Payment failed. Please try again.");
    }
});
