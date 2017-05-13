CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  itemID INT NOT NULL AUTO_INCREMENT,
  productName VARCHAR(250) NOT NULL,
  departmentName VARCHAR(250) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stockQuantity INT NOT NULL,
  PRIMARY KEY (itemID)
);

INSERT INTO products (itemID, productName, departmentName, price, stockQuantity) VALUES (NULL, "Television", "Electronics", "1099.99", "24");
INSERT INTO products (itemID, productName, departmentName, price, stockQuantity) VALUES (NULL, "Portable speaker", "Electronics", "99.99", "57");
INSERT INTO products (itemID, productName, departmentName, price, stockQuantity) VALUES (NULL, "Guitar", "Instruments", "899.99", "8");
INSERT INTO products (itemID, productName, departmentName, price, stockQuantity) VALUES (NULL, "Music Keyboard", "Instruments", "799.99", "12");
INSERT INTO products (itemID, productName, departmentName, price, stockQuantity) VALUES (NULL, "Cell phone", "Electronics", "499.99", "33");
INSERT INTO products (itemID, productName, departmentName, price, stockQuantity) VALUES (NULL, "Laptop Computer", "Electronics", "1499.99", "29");
INSERT INTO products (itemID, productName, departmentName, price, stockQuantity) VALUES (NULL, "Men's Watch", "Accessories", "199.99", "41");
INSERT INTO products (itemID, productName, departmentName, price, stockQuantity) VALUES (NULL, "Women's Shoes", "Clothes", "79.99", "37");
INSERT INTO products (itemID, productName, departmentName, price, stockQuantity) VALUES (NULL, "Baby Clothes", "Clothes", "29.99", "80");
INSERT INTO products (itemID, productName, departmentName, price, stockQuantity) VALUES (NULL, "Men's Ties", "Accessories", "39.99", "26");