var connection = require("../config/connection.js");

var orm = {
  selectWhere: function(tableInput, colToSearch, valOfCol, myCallbackSelectWhere) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, dataReturningFromMySQL) {
      myCallbackSelectWhere(dataReturningFromMySQL);
    })
  },
  
  deleteWhere: function(tableInput, colToSearch, valOfCol, myCallbackDeletetWhere) {
      var queryString = "DELETE FROM ?? WHERE ?? = ?";

    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, dataReturningFromMySQL) {
      myCallbackDeletetWhere(dataReturningFromMySQL);
    });
  }
};

module.exports = orm;
