let Order = require('./../model/order');
let User = require('./../model/user');
let sequelize = require('./newSeq');

let Ordering = sequelize.define('ordering', {}, { freezeTableName: true }); // 定义关联表Ordering


Order.belongsToMany(User, { through: 'ordering' }); // 定义Order和User的关系为多对多关系，通过Ordering关联
User.belongsToMany(Order, { through: 'ordering' });


module.exports = { Order, User, Ordering }