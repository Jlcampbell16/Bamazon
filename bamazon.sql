DROP DATABASE IF EXISTS bamazon_db;
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (100) NOT NULL,
	department_name VARCHAR (100),
	price DECIMAL(10,2),
   stock_quantity INT,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Dog Food", "Pet Supplies", 68.20, 14),
("Diamond Earrings", "Jewelry", 1199.99, 7),
("Ready Player One by Ernest Cline", "Books", 19.74, 185),
("Phone Case", "Cell Phones and Accessories", 24.62, 2),
("Face Lotion", "Beauty and Personal Care", 18.95, 24),
("Bananas", "Grocery", 1.79, 128),
("KitchenAid", "Home and Kitchen", 279.00, 87),
("Magic 8 Ball", "Toys and Games", 11.43, 3),
("Power Drill", "Tools", 60.58, 102),
("Sticky Notes", "Office Products", 7.26, 19)
;
SELECT * FROM products;