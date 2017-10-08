// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
const util = require('util');
let fs = require("fs");
const DBVersion = true;
var orm = require("../config/orm.js");
var tmp;

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    // ===============================================================================
    //FUNCTIONS
    // ===============================================================================

    var reIndexJSONData = function (inArray) {
        console.log("reIndex BEFORE: ", inArray);
        
        for (var i = 0; i < inArray.length; i++) {
          inArray[i].id = i;
        }
        console.log("reIndex Returning", inArray);
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
            console.log("tmp", tmp);
            burgersTmp = JSON.parse(tmp);
            console.log("burgersTmp", burgersTmp);
        }
  
        //Call reIndexJSONData to  Re-Index Array from 0 to n-1
        return reIndexJSONData(burgersTmp);
  
    }; //Function ReadJSONData()
      
    // ===============================================================================
    // ROUTING
    // ===============================================================================

    // Post route -> back to home
    app.post("/submitData", function(req, res) {
        // Test it
        var newBurgerName = req.body.burgername;
        console.log("/submitData Received: newBurgerName'" + newBurgerName + "'");
        var burgersEaten = [];
        var burgersFresh = [];
        var burgers = ReadJSONData();
        //Add New String to Burgers Array
        burgers.push( {
            id: burgers.length,
            name: req.body.burgername,
            devoured: false
        });
        console.log("burgers After Push", burgers);
        
        WriteJSONData(burgers);
        
        for (var i = 0; i < burgers.length; i++) {
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
    });

    function ReadBurgerTable() {
        orm.selectWhere("burgers", "eaten", "0", function(dataFromMySQL) {
            console.log("dataFromMySQL", dataFromMySQL);
            var string=JSON.stringify(dataFromMySQL);
            console.log('>> string: ', string );
            var json =  JSON.parse(string);
            console.log('>> json: ', json);
            console.log('>> burgers[0].name: ', json[0].name);
            tmp = json;
            console.log("tmp Inside ReadBurger: ", tmp);
            //return json;
        });
    }
    //DEBUGGING


    // If no matching route is found default to home
    app.get("*", function(req, res) {
        // console.log("Inside app.get(*)");
        var burgersEaten = [];
        var burgersFresh = [];
        var burgers;
        if (DBVersion) {
            // burgers = ReadBurgerTable();
            //ReadBurgerTable();
            orm.selectWhere("burgers", "eaten", "0", function(dataFromMySQL) {
                console.log("dataFromMySQL", dataFromMySQL);
                var string=JSON.stringify(dataFromMySQL);
                console.log('>> string: ', string );
                var json =  JSON.parse(string);
                console.log('>> json: ', json);
                console.log('>> json[0].name: ', json[0].name);
                for (i = 0; i < json.length; i++) {
                    if (json[i].devoured == true) {
                        burgersEaten.push(json[i]);
                      } else {
                        burgersFresh.push(json[i]);
                      }
                }
                console.log("app.get('*') burgersFresh = " + burgersFresh + "; burgersEaten = " + burgersEaten);
                console.log("Fresh: ", util.inspect(burgersFresh, {showHidden: false, depth: null}))
                console.log("Eaten: ", util.inspect(burgersEaten, false, null));
                res.render("index", {
                    burgers: burgersFresh,
                    eaten: burgersEaten
                });        
            });
        } else {
            burgers = ReadJSONData();
        }

        for (i = 0; i < burgers.length; i++) {
            if (burgers[i].devoured == true) {
                burgersEaten.push(burgers[i]);
              } else {
                burgersFresh.push(burgers[i]);
              }
        }
        console.log("app.get('*') burgersFresh = " + burgersFresh + "; burgersEaten = " + burgersEaten);
        console.log("Fresh: ", util.inspect(burgersFresh, {showHidden: false, depth: null}))
        console.log("Eaten: ", util.inspect(burgersEaten, false, null));
        res.render("index", {
            burgers: burgersFresh,
            eaten: burgersEaten
        });        
    });
};
