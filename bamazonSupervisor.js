var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table');
var t = new Table;
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

    runOptions()
});


var viewProductSales = function () {

    var sqlQuery = "SELECT departments.department_id,departments.department_name,over_head_costs,  SUM(products.product_sales) AS product_sales , over_head_costs-SUM(products.product_sales) AS total_profit";
    sqlQuery += " FROM products  JOIN  departments ON products.department_name = departments.department_name";
    sqlQuery += " GROUP BY departments.department_name";

    connection.query(sqlQuery, function (error, results, fields) {
        if (error) throw error;
         
        results.forEach(function (product) {
            t.cell('Department Id', product.department_id)
            t.cell('Department Name', product.department_name)

            t.cell('Overhead costs', product.over_head_costs)
            t.cell('Product sales', product.product_sales)
            t.cell('Total profit', product.total_profit)
            t.newRow()
        })

        console.log(t.toString())
          
        runOptions();
    })

}


var insertToDepartment = function (name, cost) {

    connection.query("INSERT INTO departments(department_name,over_head_costs)VALUES(?,?)", [name, cost], function (error, results, fields) {
        if (error) throw error;
    })
    console.log("\n You have successfully added the department\n")
    runOptions();
}


var runOptions = function () {
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department",

            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewProductSales();
                    break;

                case "Create New Department":
                    createNewDepartment();
                    break;


            }
        });

}


var createNewDepartment = function () {

    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "what is the  name of the department you would like to add ?",

        },
        {
            name: "cost",
            type: "input",
            message: "what is the  overhead costs of the department ?",

        }



    ])
        .then(function (answer) {
            var departmentName = answer.department;
            var overheadCost = answer.cost;


            insertToDepartment(departmentName, overheadCost);

        })

}
