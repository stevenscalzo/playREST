var fs = require('fs');
var path = require("path");

function cargarJuegos(file) {
    let games = [];
    let pathDir = path.resolve(__dirname, file);
         
    if(!fs.existsSync(pathDir)) {
        return games;
    }

    try {
        games = JSON.parse(fs.readFileSync(pathDir, 'utf-8'));  
    } catch(err) {
        console.error(err)
    }

    return games;
}

function guardarJuegos(file, game) {

    if (game.length === 0) {
        return;
    }

    let pathDir = path.resolve(__dirname, file);

    fs.writeFileSync(pathDir, JSON.stringify(game));
}

module.exports = {
    cargarJuegos: cargarJuegos,
    guardarJuegos: guardarJuegos
};