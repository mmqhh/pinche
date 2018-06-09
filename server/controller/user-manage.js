const { User } = require('./../model/model')
const sequelize = require('./../model/newSeq')

module.exports = {
    async getUserList(req, res, next) {
        let offset = (req.body.page - 1) * 10;   // 偏移量=(当前页码-1)*每页数目
        try {
            let userList = await User.findAndCountAll({
                attributes: ['realname', 'dept', 'phone', 'createdAt'],
                    order: [['createdAt', 'DESC']],  // 根据订单创建时间排序
                    offset: offset,
                    limit: 10,
            })
            res.json({
                code: '20000',
                status: 'success',
                userList: userList.rows,
                count: userList.count
            })
        } catch (error) {
            res.json({
                code: '40003',
                status: 'fail',
                msg: error.message
            })
        }
    }
}