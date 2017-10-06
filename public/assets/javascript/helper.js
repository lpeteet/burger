exports.CheckCreateJSONData = CheckCreateJSONData;
exports.bogusFunction = bogusFunction;

/*
    Access Functions in this Module as follows:
    var helper = require('helper');
    helper.CheckCreateJSONData(); 
*/

var bogusFunction = function() {
    console.log("Inside bogusFunction");
};


// add other objects, functions, as required
var CheckCreateJSONData = function () {
    console.log("Inside CheckCreateJSONData()");
    
    let fs = require("fs");

    //Check for existence of Template
    if (!fs.existsSync("./basic.json")) {
        throw "Cannot Access Basic Template ('basic.json')";
    }
    //Have we already created the output file?
    if (fs.existsSync("./basicOut.json")) {
        console.log("basicOut Already Exists, no need to create");
    }
    
    // console.log("Reading basic.json.");

    //Read the File
    let base = require('./basic.json');
    // console.log("base", base);
    // console.log("base.length", base.length);
    //Modify Template in Memory only
    base[0].front = "Rocket Man is the Leader of ...";
    base[0].back = "North Korea";
    // console.log("base After", base);
    //let result = [];
    let result = base;
    //let obj = JSON.parse(JSON.stringify(base));
    //Add Question/Answer Cards
    var obj = new basicCard("Gas, Liquid and Solid are ...", "Phases");
    // console.log("obj", obj);
    result.push(obj);
    // console.log("result", result);
    obj = new basicCard("The Eiffel Tower is in ...", "France");
    // console.log("obj", obj);
    result.push(obj);
    // console.log("result", result);
    obj = new basicCard("... was the first president of the United States?", "George Washington");
    result.push(obj);
    // console.log("result", result);
    
    //    var string = JSON.stringify(base, null, '\t');
//   Also: fs.writeFileSync() && fs.appendFileSync()
    //Write the Output File now
    fs.writeFileSync('./basicOut.json', JSON.stringify(result, null, 4));
//   fs.appendFileSync('./basicOut.json', JSON.stringify(result, null, 4));
    
/*     fs.writeFile('./basicOut.json', string, function(err) {
        if (err) return console.error(err);
        console.log('done');
    })
    */
    //Save Result to Global cards Variable
    cards = result;
    // console.log("Returning from checkCreateCards()");\


}; //Function CheckCreateJSONData()
    