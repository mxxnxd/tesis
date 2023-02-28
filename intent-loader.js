const fs = require('fs'); 
const csv = require('csv-parser');

const filepath = 'intent-definition.csv';

/*
    Reads the CSV file containg Intent definition and formats it into JSON
*/
const loadIntentCSV = () => {
    const jsons = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filepath).on('error', (error) => {
            reject(error);
        }).pipe(csv()).on('data', (row) => {
            try {
                let intent = {
                    intent_name: row.intent_name,
                    training_phrases: row.training_phrases,
                    trained_responses: row.trained_responses,
                    quick_replies: row.quick_replies
                };
                jsons.push(formatJSONStrings(intent));
            }
            catch(err) {
                console.log("An error occured!");
            }   
        }).on('end', () => {
            resolve(jsons);
        });
    });
};

const formatJSONStrings = (json) => {
    json.training_phrases = json.training_phrases.replace(/\s/g, "").split(',');
    json.trained_responses = json.trained_responses.replace(/\s/g, "").split(',');
    json.quick_replies = json.quick_replies.replace(/\s/g, "").split(',');
    return json;
};

module.exports = {
    loadIntentCSV
};