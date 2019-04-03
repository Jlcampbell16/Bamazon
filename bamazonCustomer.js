var mysql = require("mysql");
var inquirer = require('inquirer');
var clear = require('clear');

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db",
});

connection.connect(function (err) {
  if (err) throw err;
  // console.log(`Connected as ID ${connection.threadId}.`);
  displayProducts();
});

var productsAvail = [];

//Include the ids, names, and prices of products for sale.
function displayProducts() {
  console.log("\nHere are all the available products:");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      productsAvail.push(`${res[i].item_id} | ${res[i].product_name} | $${res[i].price}`);
    };
    console.log(productsAvail)
    run();
  });
};


//Promt questions
function run() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the ID of the item you would like to buy:",
      name: "id",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true
        }
        console.log(`Please enter an ID number.`);
        return false
      }
    },
    {
      type: "input",
      message: `How many units would you like to buy?`,
      name: "units",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true
        }
        console.log(`Please enter a number.`);
        return false
      }
    }
  ]).then(function (res) {
    units = parseInt(res.units);

    connection.query("SELECT * FROM products WHERE item_id=?", [res.id], function (err, res) {
      if (err) throw err;

      // check stock & calculate total cost
      var currentQuantity = res[0].stock_quantity;
      var price = res[0].price;
      var productName = res[0].product_name

      if (units <= currentQuantity) {
        var newQuantity = currentQuantity - units;

        connection.query("UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newQuantity
            },
            {
              item_id: res[0].item_id
            }
          ], function (err, res) {
            if (err) throw err;
            var totalPrice = units * price;
            console.log(`\nYour total cost for ${units} units of ${productName} is $${totalPrice}.`);

            productsAvail = [];
            displayProducts();
          }
        )
      }
      else {
        console.log(`Insufficient Quantity.\n\n`);

        productsAvail = [];
        displayProducts();
      }
    })
  });
};






