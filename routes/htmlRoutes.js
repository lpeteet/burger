// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

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

    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    // Data
/*     var burgers = [
        {
            name: "Double Bacon Cheeseburger"
        },
        {
            name: "Ham and Swiss Burger"
        },
        {
            name: "Chicken Burger"
        }
    ];
 */

    // Post route -> back to home
    app.post("/submitData", function(req, res) {
        // Test it
        var newBurgerName = req.body.burgername;
        console.log("/submitData Received: newBurgerName'" + newBurgerName + "'");
        console.log("Calling ReadJSONData()");
        var burgers = ReadJSONData();

        //Add New String to Burgers Array
        burgers.push( {name: req.body.burgername} );
        console.log("burgers After Push", burgers);
        WriteJSONData(burgers);
        
        res.render("index", {
            // png: path.join(__dirname, "../public/assets/img/Burger.png"),
            burgers: burgers
        });        
        // Test it
        // res.send('You sent, ' + req.body.task);
    
        /*
            connection.query("INSERT INTO tasks (task) VALUES (?)", [req.body.task], function(err, result) {
            if (err) throw err;
            res.redirect("/");
            });
        */
    });

    // If no matching route is found default to home
    app.get("*", function(req, res) {
        console.log("Inside app.get(*)");
        res.render("index", {
            // png: path.join(__dirname, "../public/assets/img/Burger.png"),
            burgers: []
        });        
        //res.send("This Should Be the Home Page!");
        // res.sendFile(path.join(__dirname, "../public/reserve.html"));
    });
};
