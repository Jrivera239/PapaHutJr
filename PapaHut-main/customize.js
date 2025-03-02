//Change options for pizza toppings and add to final price
const urlParams = new URLSearchParams(window.location.search);
const pizzaType = urlParams.get("type");
let basePrice = parseFloat(urlParams.get("price"));

// Update page content
document.getElementById("pizza-name").textContent = pizzaType.replace("_", " ").toUpperCase();
document.getElementById("base-price").textContent = basePrice.toFixed(2);
document.getElementById("total-price").textContent = basePrice.toFixed(2);

// Function to update total price
function updateTotalPrice() {
    let totalPrice = basePrice;
    document.querySelectorAll(".topping:checked").forEach(checkedBox => {
        totalPrice += parseFloat(checkedBox.value); // Add each selected topping price
    });
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

// Attach event listeners to toppings
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".topping").forEach(checkbox => {
        checkbox.addEventListener("change", updateTotalPrice);
    });

    // Add to Cart Button
    document.getElementById("add-to-cart").addEventListener("click", function () {
        let selectedToppings = [];
        document.querySelectorAll(".topping:checked").forEach(checkedBox => {
            selectedToppings.push(checkedBox.parentElement.textContent.trim());
        });

        let totalPrice = parseFloat(document.getElementById("total-price").textContent);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({
            pizzaType: pizzaType,
            toppings: selectedToppings,
            price: totalPrice
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Pizza added to cart!");
    });
});



