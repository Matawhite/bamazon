var mysql = require('mysql');
var inquirer = require('inquirer');
var connectDB = require('./connectDB');
var dividerText = '*****************************';

readTableDB();

function readTableDB(){
  connectDB.connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
    res.forEach(function(data){
      console.log(`Item ID: ${data.ItemID}`);
      console.log(`Item Name: ${data.ProductName}`);
      console.log(`Department: ${data.DepartmentName}`);
      console.log(`Price: ${data.Price}`);
      console.log(`Amount in Stock: ${data.StockQuantity}`);
      console.log(dividerText);
    })
  })
};

connectDB.connection.end();
