// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "root",
  database: "burger"
});

var connectionJawsDB = mysql.createConnection({
  port: 3306,
  host: "ysp9sse09kl0tzxj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "root",
  database: "burger"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
