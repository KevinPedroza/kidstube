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

const Menores = sequelize.define('menore', {
    id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
    nombre: Sequelize.STRING,
    nombreusuario: Sequelize.STRING,
    pin: Sequelize.INTEGER,
    edad: Sequelize.INTEGER,
});

const Videos = sequelize.define('video', {
    id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
    name: Sequelize.STRING,
    url: Sequelize.STRING,
    video: Sequelize.STRING
});


module.exports = {
    User,
    Usuario,
    Menores,
    Videos
}