document.addEventListener("DOMContentLoaded", () => {
    const orderDetails = document.getElementById("order-details");
    const orderTime = new Date().toLocaleTimeString();
    
    // Create a random order number
    const orderNumber = Math.floor(Math.random() * 1000000);
    
    orderDetails.innerHTML = `
        <div class="order-info">
            <p><strong>Order Number:</strong> #${orderNumber}</p>
            <p><strong>Order Time:</strong> ${orderTime}</p>
        </div>
    `;
    
    // Clear the cart after successful order
    localStorage.removeItem("cart");
    localStorage.removeItem("cartTotal");
}); 