// Retrieve cart from local storage or initialize an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = ""; // Clear previous items
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<tr><td colspan='3'>Your cart is empty.</td></tr>";
    } else {
        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.pizzaType} (${item.toppings.length > 0 ? item.toppings.join(", ") : "No toppings"})</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
            total += item.price;
        });
    }

    cartTotalElement.textContent = total.toFixed(2);
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Ensure cart updates when page loads
document.addEventListener("DOMContentLoaded", updateCartDisplay);

// Checkout button event
document.getElementById("checkout-button").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some pizzas first.");
    } else {
        alert("Proceeding to checkout...");
        window.location.href = "checkout.html";
    }
});

// Add clear cart functionality
document.getElementById("clear-cart").addEventListener("click", function() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
});
