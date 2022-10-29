const express = require('express');
const utilidades = require('./utilidades');
const file = "./games.json";

let juegos = utilidades.cargarJuegos(file);
juegos.forEach(element => console.log(element));
//let app = express();

//app.listen(8080);