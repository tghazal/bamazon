var mysql = require("mysql");
var inquirer = require("inquirer");
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
        for (var i = 0; i < results.length; i++) {
            console.log(`Item-ID = ${results[i].item_id} 
        Product-Name = ${results[i].product_name}  
        Department_Name = ${results[i].department_name} 
        Price = ${results[i].price}   
        Inventory = ${results[i].stock_quantity} `)
        }
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
            connection.query("SELECT stock_quantity,price FROM products WHERE item_id=?", [id], function (error, results, fields) {
                var price=results[0].price;
                if (count > results[0].stock_quantity)
                {
                    console.log("Insufficient quantity!")
                }
                else
                {
                    var newQuantity = results[0].stock_quantity - count;
                    connection.query("update products set stock_quantity=? where item_id=?", [newQuantity, id], function (error, results, fields) {
                        if (error) throw error;
                    })

                var totalPrice=price*count;
                console.log("Total Proce = "+totalPrice);
                
                }
                console.log("waiting until list all product ....")
                setTimeout(selectAllProducts,3000);

            })
        



        });

}
connection.connect(function (err) {
    if (err) throw err;
    console.log("connecting to database")

    selectAllProducts();
});

