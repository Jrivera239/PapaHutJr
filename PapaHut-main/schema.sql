CREATE DATABASE IF NOT EXISTS papa_hut_db;
USE papa_hut_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') DEFAULT 'customer'
);

-- Menu Table
CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'preparing', 'completed') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE
);

INSERT INTO pizzas (name, description, price, image_path) VALUES
('Pepperoni Pizza', 'Delicious pepperoni with mozzarella cheese.', 12.99, 'images/pepperoni_pizza.jpg'),
('Cheese Pizza', 'Classic cheese pizza with mozzarella.', 10.99, 'images/cheese_pizza.jpg'),
('Supreme Pizza', 'Loaded with various toppings.', 14.99, 'images/supreme_pizza.jpg'),
('Chicken Bacon Pizza', 'Grilled chicken with crispy bacon.', 13.99, 'images/chicken_bacon_pizza.jpg');

INSERT INTO toppings (name, price) VALUES
('Bacon', 1.50),
('Olives', 1.00),
('Onion', 0.75),
('Pepperoni', 1.50),
('Parmesan', 1.25),
('Salami', 1.50),
('Sausage', 1.50);
