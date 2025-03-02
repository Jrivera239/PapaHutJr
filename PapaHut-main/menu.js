const menuItems = [
    { name: "Cheese Pizza", price: 8.99, image: "images/cheese_pizza.png.webp", description: "Classic cheese pizza with rich tomato sauce and melted mozzarella." },
    { name: "Pepperoni Pizza", price: 9.99, image: "images/pepperoni_pizza.png.webp", description: "A delicious pizza topped with crispy pepperoni and gooey cheese." },
    { name: "Veggie Pizza", price: 10.99, image: "images/veggie_pizza.png.webp", description: "Fresh vegetables including bell peppers, onions, olives, and mushrooms." },
    { name: "Meat Lovers Pizza", price: 12.99, image: "images/meat_lovers_pizza.png.webp", description: "Loaded with pepperoni, sausage, bacon, ham, and ground beef." },
    { name: "BBQ Chicken Pizza", price: 11.99, image: "images/bbq_chicken_pizza.png.webp", description: "Smoky BBQ sauce, grilled chicken, red onions, and melted cheese." }
];


function displayMenu() {
    let menuSection = document.getElementById("pizza-list");
    menuSection.innerHTML = "";
    menuItems.forEach((item, index) => {
        menuSection.innerHTML += `<div class='menu-item'>
            <img src="${item.image}" alt="${item.name}" class='menu-image'>
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <button onclick="addPizza('${item.name}', ${item.price})">Add to Cart</button>
        </div>`;
    });
}

document.addEventListener("DOMContentLoaded", displayMenu);

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

function openModal(name, image, description) {
    document.getElementById("modal-title").innerText = name;
    document.getElementById("modal-image").src = image;
    document.getElementById("modal-description").innerText = description;
    document.getElementById("pizza-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("pizza-modal").style.display = "none";
}

function displayMenu() {
    let menuSection = document.getElementById("pizza-list");
    menuSection.innerHTML = "";
    menuItems.forEach((item, index) => {
        menuSection.innerHTML += `<div class='menu-item' onclick="openModal('${item.name}', '${item.image}', '${item.description}')">
            <img src="${item.image}" alt="${item.name}" class='menu-image'>
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <button onclick="addPizza('${item.name}', ${item.price}); event.stopPropagation();">Add to Cart</button>
        </div>`;
    });
}

document.addEventListener("DOMContentLoaded", displayMenu);
