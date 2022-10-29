var fs = require('fs');
var path = require("path");

function cargarJuegos(file) {
    let games = [];
    let pathDir = path.resolve(__dirname, file);      
    try {
        if(fs.existsSync(pathDir))
            games = fs.readFileSync(pathDir, 'utf-8');
        else 
            console.log("No existe el archivo");    
    } catch(err) {
        console.error(err)
    }

    return games;
}

function guardarJuegos(file, game) {

}

module.exports = {
    cargarJuegos: cargarJuegos,
    guardarJuegos: guardarJuegos
};