const fs = require('fs');

function cargarJuegos(file) {
    let games = [];
          
    try {
        games = require(file);
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