const Sequelize = require('sequelize');
const sequelize = require('./../model/newSeq');

module.exports = sequelize.define('user', {
    uid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true, },
    username: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.CHAR, allowNull: false },
    dept: { type: Sequelize.STRING, allowNull: false },
    phone: { type: Sequelize.STRING, allowNull: false }
},
    {
        freezeTableName: true
    }
);

