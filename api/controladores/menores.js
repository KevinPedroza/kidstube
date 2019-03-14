const menorService = require('../servicios/menores');

function getMenores(req, res) {
	menorService.getAll()
		.then(data => res.send(data));
};

function getMenor(req, res) {
	menorService.getById(req.params.id)
		.then(data => res.send(data));
}

function addMenor(req, res) {
	menorService.addMenor({
			nombre: req.body.nombre,
			nombreusuario: req.body.nombreusuario,
            pin: req.body.pin,
            edad: req.body.edad
		})
		.then(data => res.send(data));
};

function updateMenor(req, res) {
	menorService.updateMenor({
			id: req.body.id,
			nombre: req.body.nombre,
			nombreusuario: req.body.nombreusuario,
            pin: req.body.pin,
            edad: req.body.edad
		})
		.then(data => res.send(data));
};

function deleteMenor(req, res) {
	res.send(menorService.deleteMenor({
		id: req.params.id
	}));
};


module.exports = {
	getMenores,
	getMenor,
	addMenor,
	updateMenor,
	deleteMenor
}