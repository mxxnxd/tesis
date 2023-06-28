


const fs = require('fs');


const data = JSON.parse(fs.readFileSync('temp.json', 'utf8'));
const keys = Object.keys(data);

var new_data = {};

keys.forEach(key => {
    const messages = data[key];
    new_data[key] = [];

    messages.forEach(message => {
        new_data[key].push([message]);
    });
});
 
``

 
// stringify JSON Object
var jsonContent = JSON.stringify(new_data);
console.log(jsonContent);
 
fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});