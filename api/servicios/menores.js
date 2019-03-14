const Menor = require('../modelos').Menores;

const getAll = () => Menor.findAll();
const getById = id => Menor.findById(id);
const addMenor = menor => Menor.create(menor);
const updateMenor = menor => Menor.update(menor, {
    where: {
        id: menor.id
    }
});

const deleteMenor = menor => {
    Menor.findById(menor.id).then((result) => {
        console.log(result);
        return Menor.destroy({
                where: {
                    id: menor.id
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
    addMenor,
    updateMenor,
    deleteMenor
};