const Usuario = require('../modelos').Usuario;

const getAll = () => Usuario.findAll();
const getById = id => Usuario.findById(id);
const addUsuario = usuario => Usuario.create(usuario);
const updateUsuario = usuario => Usuario.update(usuario, {
    where: {
        id: usuario.id
    }
});

const deleteUsuario = usuario => {
    Usuario.findById(usuario.id).then((result) => {
        console.log(result);
        return Orders.destroy({
                where: {
                    id: usuario.id
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
    addUsuario,
    updateUsuario,
    deleteUsuario
};