// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var path = require("path");

   
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname + 'public')));
app.use(express.static('public'))

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//var helperFile = __dirname + "/public/assets/javascript/helper";
//console.log("Require(HELPER)");
//path.join(public + "/assets/javascript/helper")
//var helper = require(helperFile)(app);
// var helper = require(helperFile);
// console.log("HELPER", helper);
// console.log("Callilng HELPER.CheckCreateJSONData()");
// helper.CheckCreateJSONData();

//console.log("path.resolve", path.resolve(__dirname, 'settings.json'));

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});


