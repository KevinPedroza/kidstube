const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var pgp = require("pg-promise")( /*options*/ );
var db = pgp("postgres://postgres:12345@localhost:5432/clase_14");

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('Bienvenidos todos');
});

app.route('/libro')
    .get(function (req, res) {
        db.any("SELECT * from libro")
            .then(function (data) {
                console.log("DATA:", data);
                res.send(data);
            })
            .catch(function (error) {
                console.log("ERROR:", error);
            });
    })
    .post(function (req, res) {

        const dataSingle = {
            nombre: req.body.nombre,
            autor: req.body.autor
        };
        console.log(dataSingle);
        db.none('INSERT INTO  libro (nombre,autor) VALUES(${nombre}, ${autor});', dataSingle)
            .then(() => {
                res.send("Insercción correcta");
            })
            .catch(error => {
                console.log(error);
            });
    }).put(function (req, res) {
        const dataSingle = {
            id: req.body.id,
            nombre: req.body.nombre,
            autor: req.body.autor
        };
        console.log(dataSingle);
        db.none('update libro set nombre=${nombre},autor=${autor} where id=${id};', dataSingle)
            .then(() => {
                res.send("Actulización correcta");
            })
            .catch(error => {
                console.log(error);
            });
    }).delete(function (req, res) {
        const dataSingle = {
            id: req.body.id
        };
        console.log(dataSingle);
        db.none('delete from libro where id= ${id};', dataSingle)
            .then(() => {
                res.send("Eliminación  correcta");
            })
            .catch(error => {
                console.log(error);
            });
    });

app.listen(3000, function () {
    console.log('Estoy funcionando en el puerto 3000');
});