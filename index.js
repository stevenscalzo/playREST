const express = require('express');
const utilidades = require('./utilidades');
const file = "games.json";

let juegos = utilidades.cargarJuegos(file);

let app = express();


app.get('/juegos', (req, res) => {
    let data = juegos;
    let error = '';
    let filtrosPermitidos = ['anyo', 'tipo'];

    error = buscarErrores(req, error, filtrosPermitidos);

    if(error.length > 0) {
        res.status(500).send({ ok: false, error: error});
    } else {
        enviarDatosServicio(res, aplicarFiltros(req, data), "No se encontraron juegos", "Hay un fallo en el servidor");
    }

});

app.get('/juegos/:id', (req, res) => {

    let data = juegos.filter(
        juego => juego.id == req.params['id']
    );
    
    enviarDatosServicio(res, data, "Código de juego inexistente", "Hay un fallo en el servidor");
});

app.get('/', (req, res) => {
    res.send("Bienvenido/a");
});

app.listen(8080);

function enviarDatosServicio(res, data, mensaje400, mensaje500) {
    if (data && data.length > 0) {
        res.status(200).send({ ok: true, juegos: data});
    } else if (data && data.length == 0) {
        res.status(400).send({ ok: false, error: mensaje400});
    } else  {
        res.status(500).send({ ok: false, error: mensaje500});
    }
}

function aplicarFiltros(req, data) {
    if (req.query.anyo) {
        data = data.filter(juego => juego.edad_minima <= req.query.anyo);
    }

    if (req.query.tipo) {
        data = data.filter(juego => juego.tipo == req.query.tipo);
    }
    return data;
}

function buscarErrores(req, error, filtrosPermitidos) {
    Object.keys(req.query).forEach(filtro => {
        if (error.length == 0 && !filtrosPermitidos.includes(filtro)) {
            error = "Error en el filtro " + filtro;
        }
    });
    return error;
}
