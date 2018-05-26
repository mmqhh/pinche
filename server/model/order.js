const Sequelize = require('sequelize');
const sequelize = require('./../model/newSeq')


module.exports = sequelize.define('order', {
    oid: { type: Sequelize.STRING, primaryKey: true },
    startTime: { type: Sequelize.DATE, allowNull: false },
    endTime: { type: Sequelize.DATE, allowNull: false },
    dest: { type: Sequelize.STRING, allowNull: false },
    hasManager: { type: Sequelize.BOOLEAN, allowNull: false },
    num: { type: Sequelize.INTEGER, allowNull: false },
    applicant: { type: Sequelize.STRING, allowNull: false },
},
    {
        freezeTableName: true
    }
)
