# bamazon

## **Description**

This application implements a simple command line based storefront Amazon-like using Node.js and MySQL. The application presents three interfaces: customer manager and Supervisor .


## **Bamazon Demo**
You can  watch the demo of the Bamazon customer,manager, and supervisor interfaces at the link below. 

`<addr>` [Demo](https://drive.google.com/file/d/1DvVVAxkm9J55lnXz6ph0w35bYYc8Gx1S/view)


## **NPM Packages used :**
mysql, inquirer, easy-table


## **Getting Started**
to run this app you will need to :
* Clone repo.
* Run command in Terminal or Gitbash 'npm install'
* Run command depending which mode you would like to be on:
    * Customer - 'node  bamazonCustomer.js'
    * Manager - 'node bamazonManager.js'
    * Supervisor - 'node bamazonSuoervisor.js'
* Run 'ctrl + c' to exit each mode

## **DataBase Schema**

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NOT NULL ,
department_name VARCHAR(100)NOT NULL,
price FLOAT NOT NULL,
stock_quantity INT NOT NULL,
product_sales INT NOT NULL DEFAULT 0
);

CREATE TABLE departments(
department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(100) NOT NULL,
over_head_costs FLOAT
);


