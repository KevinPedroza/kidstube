const userService = require('../servicios/user');

function getUsersWithOrders(req, res) {
	return userService.getUsersWithOrders()
		.then(data => res.send(data));
};

module.exports = {
	getUsersWithOrders
}