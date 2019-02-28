const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const authService = require('../servicios/auth');
const userService = require('../servicios/user');

function login(req, res) {
	return authService.authenticate(req.body)
		.then(token => {
			res.send({
				success: true,
				data: {
					token
				}
			});
		})
		.catch(err => {
			if (err.type === 'custom') {
				return res.send({
					success: false,
					message: err.message
				});
			}
			return res.send({
				success: false,
				message: 'Authentication failed. Unexpected Error.' + err.message
			});
		})
};

function register(req, res) {
	var login = req.body.login;
	return userService.getUserByLogin(req.body.login || '')
		.then(exists => {

			if (exists) {
				return res.send({
					success: false,
					message: 'Registration failed. User with this email already registered.'
				});
			}
			var salt = bcrypt.genSaltSync(config.saltRounds);
			var user = {
				login: req.body.login,
				password: bcrypt.hashSync(req.body.password, salt)
			}

			return userService.addUser(user)
				.then(() => res.status(201).send({
					success: true
				}));
		});
};

module.exports = {
	login,
	register
}