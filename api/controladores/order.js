const orderService = require('../servicios/order');

function getOrders(req, res) {
	orderService.getAll()
		.then(data => res.send(data));
};

function getOrder(req, res) {
	orderService.getById(req.params.id)
		.then(data => res.send(data));
}

function addOrder(req, res) {
	orderService.addOrder({
			title: req.body.title,
			date: req.body.date,
			user_id: req.body.user_id
		})
		.then(data => res.send(data));
};

function updateOrder(req, res) {
	orderService.updateOrder({
			id: req.body.id,
			title: req.body.title,
			date: req.body.date,
			user_id: req.body.user_id,
		})
		.then(data => res.send(data));
};

function deleteOrder(req, res) {
	res.send(orderService.deleteOrder({
		id: req.params.id
	}));
};


module.exports = {
	getOrders,
	getOrder,
	addOrder,
	updateOrder,
	deleteOrder
}