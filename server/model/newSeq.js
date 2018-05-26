const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: 'pinche',
    username: 'root',
    password: '123456789',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize