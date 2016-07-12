var mysql = require('mysql');
var inquirer = require('inquirer');
var connectDB = require('./connectDB');

start()
function start(){
  getProducts();
  inquirer.prompt([

  {
    name: 'id',
    message: 'Please select an item you wish to purchase by it\'s ID number.'
  },
  {
    name: 'amount',
    message: 'How many do you wish to purchase?'
  }

  ]).then(function (answers) {
    connectDB.connection.query('SELECT StockQuantity FROM Products WHERE ItemID = ?',[answers.id],function(err, res){
      if(err) throw err;
      var quantity = res[0].StockQuantity;
      if(quantity > answers.amount){
        console.log('Database updated.');
        updateStock(answers.amount, answers.id);
        getProducts();
      }else{
        console.log('Sorry we do not have enough items to fullfil your order.');
      }
      connectDB.connection.end();
    })
  })
}

function getProducts(){
  connectDB.connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
    res.forEach(function(data){
      console.log(`\nItem ID: ${data.ItemID} Item Name: ${data.ProductName} Department: ${data.DepartmentName} Price: ${data.Price} Amount in Stock: ${data.StockQuantity}`);
    })
  })
};

function updateStock(amount, id){
connectDB.connection.query('UPDATE Products SET `StockQuantity` = StockQuantity - ? WHERE ItemID = ?',
  [amount, id],
  function(err, res){
    if(err) throw err;
    console.log()
  })
}
