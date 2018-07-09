var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user: "root",
    password: "root",
    database: "bamazon"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connecting to database")

    runList()
});

var  viewProduct=function(){

    connection.query('select * from products', function (error, results, fields) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
            console.log(`Item-ID = ${results[i].item_id} 
        Product-Name = ${results[i].product_name}  
        Department_Name = ${results[i].department_name} 
        Price = ${results[i].price}   
        Inventory = ${results[i].stock_quantity} 
        `)
        }
        runList();
    })
}

var viewLowInventory=function(){

    connection.query("SELECT * FROM products ", function (error, results, fields) {
        for(var x=0;x<results.length;x++)
        {
           var count = results[x].stock_quantity
        if (count <5)
        {

            console.log(`
            items with an inventory count lower than five :
            Item-ID = ${results[x].item_id} 
            Product-Name = ${results[x].product_name}  
            Department_Name = ${results[x].department_name} 
            Price = ${results[x].price}   
            Inventory = ${results[x].stock_quantity} 
            `)
        }
       
        
    } 
    runList();
    })
}
var selectId=function(id){
    connection.query("SELECT * FROM products WHERE item_id=?", [id], function (error, results, fields) {
        console.log(`
            items that you added to : 
            Item-ID = ${results[0].item_id} 
            Product-Name = ${results[0].product_name}  
            Department_Name = ${results[0].department_name} 
            Price = ${results[0].price}   
            Inventory = ${results[0].stock_quantity} 
            `)
          runList();    
    })
  

}

var insert=function(name,price,department,count){

    connection.query("INSERT INTO products(product_name,department_name,price,stock_quantity)VALUES(?,?,?,?)", [name,department,price,count], function (error, results, fields) {
        if (error) throw error;})
 console.log("\n You have successfully added the item \n")
runList();
}


var  addNewProduct=function(){

    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "what is the  name of the product you would like to add ?",
           
        },
        {
            name: "department",
            type: "input",
            message: "what is the  name of the department ?",
           
        },

        {
            name: "price",
            type: "input",
            message: "what is the price of the product?",
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
            message: "how many units of the product you would like to add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ])
    .then(function(answer){
      var name=answer.product;
      var price=answer.price;
      var department=answer.department;
      var count=answer.count;

      insert(name,price,department,count);

    })

}

var addToInventory = function()
{
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "what is the  ID of the product you would like to add more?",
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
            message: "how many units of the product you would like to add?",
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

        connection.query("SELECT stock_quantity FROM products WHERE item_id=?", [id], function (error, results, fields) {
         
            var newQuantity = results[0].stock_quantity +Number(count);
            connection.query("update products set stock_quantity=? where item_id=?", [newQuantity, id], function (error, results, fields) {
            if (error) throw error;
            })
    })
    console.log("\n you have successfuly increase the inventory for the item \n " )
    selectId(id);
    //runList();
    })
}

   var runList=function()
   {
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
              "View Products for Sale",
              "View Low Inventory",
              "Add to Inventory",
              "Add New Product"
            ]
        }).then(function(answer){
            switch(answer.action)
            {
                case "View Products for Sale":
                viewProduct();
                break;

                case "View Low Inventory":
                viewLowInventory();
                break;

                case "Add to Inventory":
                addToInventory();
                break;

                case "Add New Product":
                addNewProduct();
                break;
            }
        });
            
 }
    
