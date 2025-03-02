document.addEventListener("DOMContentLoaded", () => {
    displayMenu();
});

const menuForm = document.getElementById("menu-form");
menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const itemName = document.getElementById("item-name").value;
    const itemPrice = parseFloat(document.getElementById("item-price").value);
    
    if (!itemName || isNaN(itemPrice)) {
        alert("Please enter valid item details.");
        return;
    }
    
    let menu = JSON.parse(localStorage.getItem("menu")) || [];
    menu.push({ name: itemName, price: itemPrice });
    localStorage.setItem("menu", JSON.stringify(menu));
    
    displayMenu();
    menuForm.reset();
});

function displayMenu() {
    const menuList = document.querySelector(".menu-list");
    menuList.innerHTML = "";
    const menu = JSON.parse(localStorage.getItem("menu")) || [];
    
    menu.forEach((item, index) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        menuList.appendChild(menuItem);
    });
}

function removeItem(index) {
    let menu = JSON.parse(localStorage.getItem("menu")) || [];
    menu.splice(index, 1);
    localStorage.setItem("menu", JSON.stringify(menu));
    displayMenu();
}
