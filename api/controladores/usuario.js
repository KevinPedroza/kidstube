const usuarioService = require('../servicios/usuario');
var crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

// https://github.com/seegno/authy-client
const Client = require('authy-client').Client;
const authy = new Client({key: 'df7yMIi6Mtmj48U0X9HdsZNmL2sRmzdi'});
sgMail.setApiKey('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');

function getUsuarios(req, res) {
	usuarioService.getAll()
		.then(data => res.send(data));
};

function getUsuario(req, res) {
	usuarioService.getById(req.params.id)
		.then(data => res.send(data));
}

function addUsuario(req, res) {
	var seed = crypto.randomBytes(20);
	var authToken = crypto.createHash('sha1').update(seed + req.body.email).digest('hex');
	
	usuarioService.addUsuario({
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
			lastname: req.body.lastname,
			phone: req.body.phone,
			autenticado: false,
			token: authToken,
			age: req.body.age,
			code: req.body.code
		})
		.then(data => res.send(data));

		authy.registerUser({
			countryCode: req.body.code,
			email: req.body.email,
			phone: req.body.phone
		}, function (err, regRes) {
			if (err) {
				console.log('Error Registering User with Account Security');
				res.status(500).json(err);
				return;
			}
		});

	var authenticationURL = 'http://localhost:8000/verify_email?token=' + authToken;
	const msg = {
		to: req.body.email,
		from: 'kevinlarios2343@gmail.com',
		subject: 'Welcome to Kevins Tube! Confirm your Account!',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<a target=_blank href=\"' + authenticationURL + '\">Confirm your email</a>',
		};
		sgMail.send(msg);
};

function updateUsuario(req, res) {
	usuarioService.updateUsuario({
		id: req.body.id,
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		lastname: req.body.lastname,
		phone: req.body.phone,
		autenticado: req.body.autenticado
		})
		.then(data => res.send(data));
};

function deleteUsuario(req, res) {
	res.send(usuarioService.deleteUsuario({
		id: req.params.id
	}));
};


module.exports = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario
}