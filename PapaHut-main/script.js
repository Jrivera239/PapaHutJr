let cart = [];
let discount = 0;
const validCoupons = {
    "PAPA10": 0.10,
    "FREESHIP": 0.00,
    "BIGDEAL20": 0.20
};

function addPizza(name, price) {
    cart.push({ name, price, toppings: [] });
    updateCart();
}

function removePizza(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    let cartSection = document.getElementById("cart-items");
    cartSection.innerHTML = "";
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        cartSection.innerHTML += `<div>
            ${item.name} - $${item.price.toFixed(2)}
            <button onclick="removePizza(${index})">Remove</button>
        </div>`;
    });

    let discountAmount = total * discount;
    let finalTotal = total - discountAmount;
    cartSection.innerHTML += `<p><strong>Total: $${finalTotal.toFixed(2)}</strong></p>`;
}

function applyCoupon() {
    let code = document.getElementById("coupon-code").value.trim().toUpperCase();
    if (validCoupons.hasOwnProperty(code)) {
        discount = validCoupons[code];
        document.getElementById("discount-message").innerText = `Coupon Applied! ${discount * 100}% off`;
        updateCart();
    } else {
        document.getElementById("discount-message").innerText = "Invalid Coupon";
    }
}

function confirmOrder() {
    let deliveryOption = document.querySelector("input[name='deliveryOption']:checked").value;
    let estimatedTime = deliveryOption === "pickup" ? "15 minutes" : "45 minutes";
    document.getElementById("order-confirmation").innerText = `Your order will be ready in ${estimatedTime}. Please confirm.`;
    document.getElementById("finalize-order").style.display = "block";
}

function placeOrder() {
    alert("Your order has been placed!");
    cart = [];
    discount = 0;
    updateCart();
    document.getElementById("checkout-section").style.display = "none";
    document.getElementById("finalize-order").style.display = "none";
}

let users = {};
function register() {
    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value;
    if (user && pass) {
        users[user] = pass;
        document.getElementById("auth-message").innerText = "Registration successful!";
    } else {
        document.getElementById("auth-message").innerText = "Please enter a username and password.";
    }
}

function login() {
    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value;
    if (users[user] && users[user] === pass) {
        document.getElementById("auth-message").innerText = "Login successful!";
    } else {
        document.getElementById("auth-message").innerText = "Invalid credentials!";
    }
}
