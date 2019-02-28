const config = require('./config');
const Sequelize = require('sequelize');
var sequelize = new Sequelize(config.dbConnectionString, {
    operatorsAliases: config.operatorsAliases
});
require('sequelize-values')(sequelize);

module.exports = sequelize;