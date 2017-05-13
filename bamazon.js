// node package requirements

var mysql = require('mysql');
var prompt = require('prompt');
var inquirer = require('inquirer');
var Table = require('cli-table');
var colors = require('colors');
require('dotenv').config();
var password = process.env.password;

// connect to  database

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'bamazon'
});


// function to display the table
var displayTable = function() {
  // create a new instance of the table object (cli-table documentation)
  var table = new Table({
    head: ['ID'.yellow, 'Product Name'.yellow, 'Department'.yellow, 'Price'.yellow, 'Stock Quantity'.yellow],
    colWidths: [5, 30, 20, 20, 20]
  });
  // search database for information and populate the table
  connection.query('SELECT * FROM products', function(error, results) {
    if(error) throw error;
    
    for(var i = 0; i < results.length; i++) {
      table.push(
          [results[i].itemID, results[i].productName, results[i].departmentName, results[i].price, results[i].stockQuantity]
      );
    }
    
    console.log('\n' + table.toString());
  }); 
}; 


// function to display the items for sale and start app
var displayProducts = function() {
  console.log('ITEMS FOR SALE');
  displayTable();

    start();
}; 


// function to start the user prompt
var start = function() {
  
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmBuy',
      message: 'Would you like to purchase any of these items?'
    }
  ]).then(function(answers) {
    if(answers.confirmBuy) {
      buyProducts();
    } else {
      console.log('Have a great day!');
      connection.end();
    }
  }); 
}; 

// function to prompt users what they want to buy and how many
var buyProducts = function() {
  
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Please enter the ID of the product you would like to buy:',
      validate: function(value) {
        if(isNaN(value) === false) {
          return true;
        } else {
          console.log(' Please enter a number.'.red);
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'number',
      message: 'How many would you like to buy?',
      validate: function(value) {
        if(isNaN(value) === false) {
          return true;
        } else {
          console.log(' Please enter a number.'.red);
          return false;
        }
      }
    }
  ]).then(function(answers) {
    console.log('Item ID:', answers.id, 'Item Amount:', answers.number);

    var query = "SELECT price, stockQuantity FROM `products` WHERE itemID=" + answers.id;
    connection.query(query, function(error, results) {
      if(error) throw error;

      var itemId = answers.id;

      var itemInventory = results[0].stockQuantity;
      console.log('Item Inventory:', results[0].stockQuantity);
      var itemAmount = answers.number;

      var itemPrice = results[0].price;
      var totalPrice = parseFloat(itemPrice) * parseFloat(itemAmount);
// check if there is enough inventory
      if(itemInventory >= itemAmount) {

// complete order if inventory is enough and show total price
        console.log('Order success! The total price is $' + totalPrice + '.');
// Update the database with remaining quantity.
        updateStock(itemId, itemInventory, itemAmount);
        continueShopping();
      } else {
// if not enough inventory show error message
        console.log('Insufficient quantity! We are unable to fill your order at this time.');
        console.log('We only have ' + itemInventory + ' items in stock.');
        displayTable();
        continueShopping();
      }
    });
  });
}; 

// function to update the stock quantity when a purchase is successfull
var updateStock = function(itemId, inventory, purchaseAmount) {
// Build query to decrease the number of items in stock after a purchase
  var query = "UPDATE products SET stockQuantity=" + (inventory -= purchaseAmount) + " WHERE itemID=" + itemId;
  connection.query(query, function(error, results) {
    if(error) throw error;
// show table to display the updated information.
    displayTable();
  });
}; 


// function to ask the customer if they'd like to continue shopping.
var continueShopping = function() {
  
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'buyMore',
      message: 'Would you like to continue shopping?'
    }
  ]).then(function(answers) {
    if(answers.buyMore) {
      buyProducts();
    } else {
      console.log('Thank you for your purchase!');
      connection.end();
    }
  });
};


// connecting to the bamazon database
connection.connect(function(err) {
    if (err) {
    console.error('error connecting: ' + err);
      return;
  }
});

displayTable();
start();