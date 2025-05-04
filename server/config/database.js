const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('weeklyTable', 'postgres', '56056', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;