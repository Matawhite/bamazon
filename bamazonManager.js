var mysql = require('mysql');
var inquirer = require('inquirer');
var connectDB = require('./connectDB');
var connection = mysql.createConnection({
  host : 'localhost',
  port: 3306,
  user : 'root',
  password: '',
  database: 'Bamazon'
});



function start(){
    inquirer.prompt([
  {
    type: 'list',
    name: 'startChoice',
    message: 'Select an action: ',
    choices: ['View Products for Sale','View Low Inventory', 'Add to Inventory', 'Add New Product','Quit']
  }

  ]).then(function(answers) {
    switch(answers.startChoice) {
    case 'View Products for Sale':
        getAllProducts();
        break;
    case 'View Low Inventory':
        getLow();
        break;
    case 'Add to Inventory':
        updateStock();
        break;
    case 'Add New Product':
        addNewItem();
        break;
    case 'Quit':
        console.log('Good Bye')
        connection.end();
        break;
      }
    })
}

function getAllProducts(){
  connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
    res.forEach(function(data){
      console.log(`\nItem ID: ${data.ItemID} Item Name: ${data.ProductName} Department: ${data.DepartmentName} Price: ${data.Price} Amount in Stock: ${data.StockQuantity}`);
    })
  })
  start();
};

function getLow(){
  connection.query('SELECT * FROM Products WHERE StockQuantity < 5', function(err,res){
    if(err) throw err;
    res.forEach(function(data){
      console.log(`\nItem ID: ${data.ItemID} Item Name: ${data.ProductName} Department: ${data.DepartmentName} Price: ${data.Price} Amount in Stock: ${data.StockQuantity}`);
    })
  })
  start();
}

function updateStock(){
  inquirer.prompt([
    {
    name: 'selectID',
    message: 'Please provide the item ID.'
    },
    {
    name: 'selectAmount',
    message: 'Please provide the new stock amount.'
    }
    ]).then(function(answers) {
    connection.query('UPDATE Products SET StockQuantity = ? WHERE ItemID = ?',
      [answers.selectAmount, answers.selectID],
      function(err, res){
        if(err) throw err;
        console.log('Stock Updated.');

      })
    })
    start();
}

function addNewItem(name, dept, cost, amount){
    inquirer.prompt([
      {
      name: 'productName',
      message: 'Please provide the name of the product.'
      },
      {
      name: 'deptName',
      message: 'Which department does this product belong?'
      },
      {
      name: 'costAmt',
      message: 'What is the default price for this product?'
      },
      {
      name: 'stockAmt',
      message: 'What is the current stock amount?'
      },
    ]).then(function(answers) {
      connection.query('INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES (?, ?,?,?)',
      [answers.productName, answers.deptName, answers.costAmt, answers.costAmt],
      function(err, res){
        if(err) throw err;
        console.log('Item added');
      })
    })
    start();
}

start()
