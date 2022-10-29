var fs = require('fs');
var path = require("path");

function cargarJuegos(file) {
    let juegos = [];
    let pathDir = path.resolve(__dirname, file);
         
    if(!fs.existsSync(pathDir)) {
        return juegos;
    }

    try {
        juegos = JSON.parse(fs.readFileSync(pathDir, 'utf-8'));  
    } catch(err) {
        console.error(err)
    }

    return juegos;
}

function guardarJuegos(file, juegos) {

    if (juegos.length === 0) {
        return;
    }

    let pathDir = path.resolve(__dirname, file);

    fs.writeFile(pathDir, JSON.stringify(juegos));
}

module.exports = {
    cargarJuegos: cargarJuegos,
    guardarJuegos: guardarJuegos
};