let cart = [];

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
    cart.forEach((item, index) => {
        cartSection.innerHTML += `<div>
            ${item.name} - $${item.price.toFixed(2)}
            <button onclick="removePizza(${index})">Remove</button>
        </div>`;
    });
}

function toggleCheckout() {
    document.getElementById("checkout-section").style.display = "block";
    let orderSummary = document.getElementById("order-summary");
    orderSummary.innerHTML = "<h3>Order Summary</h3>";
    cart.forEach(item => {
        orderSummary.innerHTML += `<div>${item.name} - $${item.price.toFixed(2)}</div>`;
    });
}

function placeOrder() {
    alert("Your order has been placed!");
    cart = [];
    updateCart();
    document.getElementById("checkout-section").style.display = "none";
}
