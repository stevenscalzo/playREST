const express = require('express');
const utilidades = require('./utilidades');
var bodyParser = require('body-parser')
const file = "games.json";

let juegos = utilidades.cargarJuegos(file);
let app = express();

app.use(bodyParser.json())

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

app.post('/juegos', (req, res) => {

    if(juegos.filter(juego => juego.id == req.body.id).length > 0) {
        res.status(400).send({ok: false, error: "Código de juego repetido"});
        return;
    }

    let nuevoJuego = {
        id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        edad_minima: req.body.edad_minima ,
        numero_jugadores: req.body.numero_jugadores ,
        tipo: req.body.tipo ,
        precio: req.body.precio 
    };

    juegos.push(nuevoJuego);
    utilidades.guardarJuegos(file, juegos)

    res.status(200).send({ok: true, juego: nuevoJuego});

});

app.put('/juegos/:id', (req, res) => {
    let indice = juegos.findIndex(juego => juego.id == req.params['id']);

    if(indice == -1) {
        res.status(400).send({ok: false, error: "Juego no encontrado"});
        return;
    }

    juegos[indice] = {
        id: juegos[indice].id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        edad_minima: req.body.edad_minima ,
        numero_jugadores: req.body.numero_jugadores ,
        tipo: req.body.tipo ,
        precio: req.body.precio 
    };

    utilidades.guardarJuegos(file, juegos)

    res.status(200).send({ok: true, juego: juegos[indice]});

});

app.delete('/juegos/:id', (req, res) => {
    let indice = juegos.findIndex(juego => juego.id == req.params['id']);

    if(indice == -1) {
        res.status(400).send({ok: false, error: "Juego no encontrado"});
        return;
    }

    juegoBorrar = juegos[indice];
    juegos.splice(indice, 1);

    utilidades.guardarJuegos(file, juegos)

    res.status(200).send({ok: true, juego: juegoBorrar});

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
        data = data.filter(juego => juego.edad_minima >= req.query.anyo);
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
