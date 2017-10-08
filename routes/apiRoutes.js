// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// var tableData = require("../data/tableData");
// var waitListData = require("../data/waitinglistData");
var tableData = {};
var waitListData = {};

module.exports = function(app) {

  // ===============================================================================
  // FUNCTIONS
  // ===============================================================================

  var reIndexJSONData = function (inArray) {
    console.log("Inside reIndexJSONData(), inArray", inArray);

    for (var i = 0; i < inArray.length; i++) {
      inArray[i].id = i;
    }

    return inArray;

  }; //Function reIndexJSONData()

  var WriteJSONData = function (burgersIn) {
    console.log("Inside WriteJSONData(), burgersIn", burgersIn);
    
    //   Also: fs.writeFileSync() && fs.appendFileSync()
    //Write the Output File now
    //fs.writeFileSync('./burgers.json', JSON.stringify(burgersIn, null, 4));
    //fs.appendFileSync('./burgers.json', JSON.stringify( {name: burgersIn}, null, 4));
    fs.writeFile ("./burgers.json", JSON.stringify(burgersIn), function(err) {
        if (err) throw err;
        console.log('./burgers.json Written!');
        }
    );

  }; //Function WriteJSONData()
      
  var ReadJSONData = function () {
      console.log("Inside ReadJSONData()");
      var burgersTmp = [];

      //Does it exist?
      if (!fs.existsSync("./burgers.json")) {
          console.log("./burgers.json Does Not Exist, Not Reading it");
      } else {
          //Read the File
          //var burgersTmp = require('./burgers.json')(app);
          var tmp = fs.readFileSync('./burgers.json', {encoding: 'utf8'});
          burgersTmp = JSON.parse(tmp);
          console.log("burgersTmp", burgersTmp);
      }

      //Call reIndexJSONData to  Re-Index Array from 0 to n-1
      return reIndexJSONData(burgersTmp);

  }; //Function ReadJSONData()

  // ===============================================================================
  // ROUTING
  // ===============================================================================

  app.get("/delete/:id", (req, res) => {
    console.log("Inside app.get(/delete/:id)");
    //var deleteID = parseInt( req.params.id);
    var deleteID = req.params.id;
    
    //Input Fields Submitted would be req.body.inputname (where inputname is on the HTML Form\\)
   
    console.log("Parameter ID To Delete = '" + deleteID + "'");

    var burgersEaten = [];
    var burgersFresh = [];
    var burgers = ReadJSONData();

    for (var i = 0; i < burgers.length; i++) {
      console.log("Does ", burgers[i].id + " == " + deleteID + "?");
      if (burgers[i].id == deleteID) {
        console.log("YES IT DOES!");
        burgers[i].devoured = true;
        break
      }
    }
    //Call reIndexJSONData to  Re-Index Array from 0 to n-1
    burgers = reIndexJSONData(burgers);

    WriteJSONData(burgers);

    for (i = 0; i < burgers.length; i++) {
      if (burgers[i].devoured) {
        burgersEaten.push(burgers[i]);
      } else {
        burgersFresh.push(burgers[i]);
      }
    }

     res.render("index", {
      burgers: burgersFresh,
      eaten: burgersEaten
    });

    // if (isNaN(deleteID)) {
    // Handle Invalid ID's such as Not a Number
    //   response.send("ID Parameter is Not A Number");
    // }
    //Cannot Respond Twice and we respond below
    //res.send('I am going to delete ID: ' + deleteID);
    //Now Delete from Database
    // connection.query("DELETE FROM tasks WHERE id = ?", deleteID, (err, results) => {
    //   if (err) {
    //     throw err;
    //   }
    //   //redirect to home page
    //   res.redirect("/");
    // })
  });

};
