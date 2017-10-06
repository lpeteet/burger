var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "ice_creamdb"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
//  Add in some pieces of code that CREATE, UPDATE, and DELETE specific pieces of data from your MySQL database. Make sure to include a 
//  READ statement at the end as well to ensure that the changes you are making are working properly.
  displayRecords();
  createNewRecord();
  updateRecord();
  deleteRecord();
});

// displayRecords - Display ALL Records from Products Table
function displayRecords() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].flavor + " | " + res[i].price + " | " + res[i].quantity);
    }
    console.log("-----------------------------------");
  });
}

// createNewRecord - Inserts a New Record and then calls displayrecords()
function createNewRecord() {
  connection.query("INSERT INTO products(flavor, price, quantity) VALUES ('Chocolate', '4.00', 100)", function(err, res) {
    console.log("createNewRecord Returned res: ", res);
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].id + " | " + res[i].flavor + " | " + res[i].price + " | " + res[i].quantity);
    // }
    console.log("-----------------------------------");
    displayRecords();
  });
}

// updateRecord - Updatesa record where id = 1 and then calls displayrecords()
function updateRecord() {
    //connection.query("UPDATE products SET quantity = (quantity - 1) Where id = 1", function(err, res) {
    //connection.query("UPDATE products SET quantity = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId]", function(err, res) {
    connection.query("UPDATE users SET foo = ? WHERE id = ?', ['(quantity - 1)', '1']", function(err, res) {
        console.log("updateRecord Returned res: ", res);
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].id + " | " + res[i].flavor + " | " + res[i].price + " | " + res[i].quantity);
    // }
    console.log("-----------------------------------");
    displayRecords();
  });
}

// deleteRecord - Deletes a record where id = 1 and then calls displayrecords()
function deleteRecord() {
  connection.query("DELETE FROM products Where Id = 2", function(err, res) {
    console.log("deleteRecord Returned res: ", res);
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].id + " | " + res[i].flavor + " | " + res[i].price + " | " + res[i].quantity);
    // }
    console.log("-----------------------------------");
    displayRecords();
  });
}



