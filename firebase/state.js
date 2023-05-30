const fs = require('fs');
const paths = require('path');
var path = paths.join(__dirname, './state.json')
var file = require(path);

const getUserState = (id) => {
    return file[id];
}

const setUserState = (id, state) => {
    file[id] = state;
    fs.writeFile(path, JSON.stringify(file), (err) => {
        if (err) {
            return console.log(err);
        }
        file = require(path);
    });
}

const delUserState = (id) => {
    delete file[id];
    fs.writeFile(path, JSON.stringify(file), (err) => {
        if (err) {
            return console.log(err);
        }
        file = require(path);
    });  
}

module.exports = {
    getUserState,
    setUserState,
    delUserState,
}