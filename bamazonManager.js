var mysql = require('mysql');
var inquirer = require('inquirer');
var connectDB = require('./connectDB');

getLow();

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


connectDB.connection.end();
