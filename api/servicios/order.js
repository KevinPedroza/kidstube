const Orders = require('../modelos').Order;

const getAll = () => Orders.findAll();
const getById = id => Orders.findById(id);
const addOrder = order => Orders.create(order);
const updateOrder = order => Orders.update(order, {
    where: {
        id: order.id
    }
});

const deleteOrder = order => {
    Orders.findById(order.id).then((result) => {
        console.log(result);
        return Orders.destroy({
                where: {
                    id: order.id
                }
            })
            .then((u) => {
                return result
            });

    });

}

module.exports = {
    getAll,
    getById,
    addOrder,
    updateOrder,
    deleteOrder
};