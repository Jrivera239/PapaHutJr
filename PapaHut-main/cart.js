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

function addToCart(itemName, itemPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the new item to the cart
    cart.push({ name: itemName, price: itemPrice });

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(itemName + " has been added to your cart!");
}


function payNow() {
    let orderNumber = Math.floor(100000 + Math.random() * 900000); // Random 6-digit order number
    alert("Thank you for your order! Your order number is: " + orderNumber);

    // Clear the cart after order is placed
    localStorage.removeItem("cart");

    // Redirect or reload page
    window.location.href = "index.html"; // Or any confirmation page
}

document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("checkoutCart");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartContainer.innerHTML = "";
        cart.forEach(item => {
            let itemElement = document.createElement("p");
            itemElement.textContent = item.name + " - $" + item.price.toFixed(2);
            cartContainer.appendChild(itemElement);
        });
    }
});
