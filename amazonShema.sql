DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NOT NULL ,
department_name VARCHAR(100)NOT NULL,
price FLOAT NOT NULL,
stock_quantity INT NOT NULL

);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("iPhone7-32G","Electronics",420,50),("iPhone7-128G","Electronics",615,75),
("iPhone8-64G","Electronics",790,20),("iPhone8-256G","Electronics",940,30),
("Dolce and Gabbana The One EDT for Men","ALL Beauty",47.89,30),("1 Million EDT for Men","ALL Beaty",64,30),
("Hugo Boss BOTTLED EDT for Men","ALL Beauty",80,35),("Guilty By Gucci EDT for Men","ALL Beauty",84,40)
,("Book:What I Know For Sure","Books",16.69,15),("Book:Own It","Books",9.60,10);