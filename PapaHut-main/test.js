// Basic test suite for Papa Hut Jr.
function runTests() {
    console.log("Running tests...");

    // Test cart functionality
    testCart();
    
    // Test menu functionality
    testMenu();
    
    // Test payment validation
    testPaymentValidation();
    
    console.log("Tests completed!");
}

function testCart() {
    console.log("Testing cart...");
    
    // Clear existing cart
    localStorage.removeItem("cart");
    
    // Add item to cart
    const testItem = {
        pizzaType: "Test Pizza",
        toppings: ["Cheese"],
        price: 10.99,
        quantity: 1
    };
    
    let cart = [];
    cart.push(testItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Verify cart
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    console.assert(storedCart.length === 1, "Cart should have 1 item");
    console.assert(storedCart[0].price === 10.99, "Price should match");
}

function testMenu() {
    console.log("Testing menu...");
    
    // Test menu loading
    const menu = JSON.parse(localStorage.getItem("menu")) || defaultMenu;
    console.assert(menu.length > 0, "Menu should not be empty");
}

function testPaymentValidation() {
    console.log("Testing payment validation...");
    
    // Test card number validation
    console.assert(!/^\d{16}$/.test("1234"), "Should reject invalid card number");
    console.assert(/^\d{16}$/.test("1234567890123456"), "Should accept valid card number");
    
    // Test expiry date validation
    console.assert(!/^(0[1-9]|1[0-2])\/\d{2}$/.test("13/23"), "Should reject invalid month");
    console.assert(/^(0[1-9]|1[0-2])\/\d{2}$/.test("12/23"), "Should accept valid date");
}

// Run tests when included in a page
if (typeof window !== 'undefined') {
    window.runTests = runTests;
} 