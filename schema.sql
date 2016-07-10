-- The products table should have each of the following columns:
--
-- ItemID (unique id for each product)
--
-- ProductName (Name of product)
--
-- DepartmentName
--
-- Price (cost to customer)
--
-- StockQuantity (how much of the product is available in stores)

CREATE DATABASE Bamazon;

USE DATABASE Bamazon;

CREATE TABLE Products(
  ItemID INTEGER AUTO_INCREMENT,
  ProductName VARCHAR(50) NOT NULL,
  DepartmentName VARCHAR(50) NOT NULL,
  Price FLOAT NOT NULL,
  StockQuantity INTEGER NOT NULL,
  PRIMARY KEY (ItemID)
);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('Cards Against Humanity', 'Toys & Games', 25.00, 25),
       ('Amazon Fire TV Stick', 'Electronics', 39.99, 39),
       ('Fujifilm INSTAX Film Twin Pack', 'Camera & Photo', 12.46, 12),
       ('$20 Playstation Store Gift Card', 'Video Games', 20.00, 20),
       ('Harry Potter and the Cursed Child', 'Books', 17.99, 17),
       ('Dockers Mens Perfect Short', 'Clothing', 11.80, 11),
       ('Dromida Kodo Unmanned Aerial Vehicle', 'Toys & Games', 39.98, 98),
       ('Fire Tablet, 7" Display, Wi-Fi, 8 GB', 'Electronics', 49.99, 23),
       ('Monster Hunter Generations', 'Video Games', 39.96, 2),
       ('No Mans Sky', 'Video Games', 59.96, 101);
