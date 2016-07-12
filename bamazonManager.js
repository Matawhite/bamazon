var mysql = require('mysql');
var inquirer = require('inquirer');
var connectDB = require('./connectDB');

start()

function start(){
  inquirer.prompt([
    //start recursion here

  {
    type: 'list',
    name: 'startChoice',
    message: 'Select an action: ',
    choices: ['View Products for Sale','View Low Inventory', 'Add to Inventory', 'Add New Product']
  }

  ]).then(function(answers) {
    console.log(answers);
  })
}

function getAllProducts(){
  connectDB.connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
    res.forEach(function(data){
      console.log(`\nItem ID: ${data.ItemID} Item Name: ${data.ProductName} Department: ${data.DepartmentName} Price: ${data.Price} Amount in Stock: ${data.StockQuantity}`);
    })
  })
};

function getLow(){
  connectDB.connection.query('SELECT * FROM Products WHERE StockQuantity < 5', function(err, res){
    if(err) throw err;
    res.forEach(function(data){
      console.log(`\nItem ID: ${data.ItemID} Item Name: ${data.ProductName} Department: ${data.DepartmentName} Price: ${data.Price} Amount in Stock: ${data.StockQuantity}`);
    })
  })
};

function updateStock(amount, id){
connectDB.connection.query('UPDATE Products SET `StockQuantity` = StockQuantity + ? WHERE ItemID = ?',
  [amount, id],
  function(err, res){
    if(err) throw err;
    console.log()
  })
}

function addItem(name, dept, cost, amount){
  connectDB.connection.query('INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES (?, ?,?,?)',[name, dept, cost, amount],function(err, res){
    if(err) throw err;
    console.log(res);
  })
}


connectDB.connection.end();
