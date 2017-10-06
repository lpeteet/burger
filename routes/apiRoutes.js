// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// var tableData = require("../data/tableData");
// var waitListData = require("../data/waitinglistData");
var tableData = {};
var waitListData = {};

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  var WriteJSONData = function (burgersIn) {
    console.log("Inside WriteJSONData(), burgersIn", burgersIn);
    
    let fs = require("fs");

    //Have we already created the output file?
    // if (fs.existsSync("./basicOut.json")) {
    //     console.log("basicOut Already Exists, no need to create");
    // }
    
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

      let fs = require("fs");
      //Does it exist?
      if (!fs.existsSync("./basic.json")) {
          console.log("./basic.json Does Not Exist, Not Reading it");
      } else {
          //Read the File
          //var burgersTmp = require('./burgers.json')(app);
          burgersTmp = JSON.parse(fs.readFileSync('./burgers.json', {encoding: 'utf8'}));
          console.log("burgersTmp", burgersTmp);
      }
          
      return burgersTmp;

  }; //Function ReadJSONData()

  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/delete/:name", (req, res) => {
    console.log("Inside app.get(/delete/:id)");
    //var deleteID = parseInt( req.params.id);
    var deleteName = req.params.name;
    
    //Input Fields Submitted would be req.body.inputname (where inputname is on the HTML Form\\)
   
    console.log("Parameter name To Delete = '" + deleteName + "'");

    var burgers = ReadJSONData();
    for (var i = 0; i < burgers.length; i++) {
      if (burgers[i].name == deleteName) {
        burgers.splice(i, 1);
        console.log("burgers After Deleting", burgers);
      }
     }
     WriteJSONData(burgers);

     res.render("index", {
      // png: path.join(__dirname, "../public/assets/img/Burger.png"),
      burgers: burgers
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

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/", function(req, res) {
      console.log("Inside app.post(/api/tables)");
      // Redirect to home page after Post
      res.redirect("/");
  });

};
