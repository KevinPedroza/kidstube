const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
    login: Sequelize.STRING,
    password: Sequelize.STRING,
});

const Usuario = sequelize.define('usuario', {
    id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    lastname: Sequelize.STRING,
    phone: Sequelize.INTEGER,
    autenticado: Sequelize.BOOLEAN,
    token: Sequelize.STRING,
    age: Sequelize.STRING,
    code: Sequelize.STRING
});


module.exports = {
    User,
    Usuario
}