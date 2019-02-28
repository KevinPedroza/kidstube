const sequelize = require('../db');
const Users = require('../modelos').User;
const Orders = require('../modelos').Arbitro;

const addUser = user => Users.create(user);
const getUserByLogin = login => Users.findOne({
	where: {
		login
	}
});

const getUsersWithOrders = () => {
	return Users.findAll({
			attributes: ['login', 'id'],
			include: [{
				model: Orders,
				as: 'orders',
				attributes: ['nombre', 'correo']
			}],
		})
		.then(sequelize.getValues);
}

module.exports = {
	addUser,
	getUsersWithOrders,
	getUserByLogin
}