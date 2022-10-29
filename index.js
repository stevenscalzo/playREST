const express = require('express');
const utilidades = require('./utilidades');
const file = "games.json";

let juegos = utilidades.cargarJuegos(file);

let app = express();


app.get('/juegos', (req, res) => {
    res.send(juegos);
});

app.get('/', (req, res) => {
    res.send("Bienvenido/a");
});

app.listen(8080);