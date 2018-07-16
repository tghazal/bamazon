var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table');


var connection = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user: "root",
    password: "root",
    database: "bamazon"
});


function selectAllProducts() {
    connection.query('select * from products', function (error, results, fields) {
        if (error) throw error;
     
        var t = new Table;
        results.forEach(function (product) {
            t.cell('Item-ID', product.item_id)
            t.cell('Product-Name', product.product_name)
            t.cell('Department_Name', product.department_name)
            t.cell('Price', product.price)
            t.newRow()
        })

        console.log(t.toString())



        runInquirer();
    })
}

var runInquirer = function () 
{
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "what is the  ID of the product you would like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "count",
            type: "input",
            message: "how many units of the product you would like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answer) {
                var count = answer.count;
                var id = answer.ID;
                connection.query("SELECT stock_quantity,price,product_sales FROM products WHERE item_id=?", [id], function (error, results, fields) {
                var price=results[0].price;
              
                if (count > results[0].stock_quantity)
                {
                    console.log("Insufficient quantity!")
                }
                else
                {
                var totalPrice=price*count;
                var oldProductSale=results[0].product_sales;
                var newProductSale=oldProductSale+totalPrice;
                var newQuantity = results[0].stock_quantity - Number(count);;
                connection.query("update products set stock_quantity=? where item_id=?", [newQuantity, id], function (error, results, fields) {
                if (error) throw error;
                })
              
                connection.query("update products set product_sales=? where item_id=?", [newProductSale, id], function (error, results, fields) {
                    if (error) throw error;
                 })
             
                console.log("Total Price = "+totalPrice);
                
                }
                console.log("waiting until list all product again....")
                setTimeout(selectAllProducts,6000);

            })
        



        });

}
connection.connect(function (err) {
    if (err) throw err;
    console.log("connecting to database")

    selectAllProducts();
});

