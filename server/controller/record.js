const { Order, Ordering, User } = require('./../model/model')
const sequelize = require('./../model/newSeq')

module.exports = {
    async getMyOrderList(req, res, next) {
        let offset = (req.body.page - 1) * 5;   // 偏移量=(当前页码-1)*每页数目
        let uid = req.body.uid
        try {
            let myOrderID = await Ordering.findAll({   // 先寻找我拼过的订单的ID
                where: { userUid: uid },
                attributes: ['orderOid']
            })
            let list2 = [];
            for (let i of myOrderID) {                 // 将我拼过的订单的ID推入一个数组
                list2.push(i.orderOid);
            }

            let myOrderList = await Order.findAndCountAll({     // 在Order表里查询这些订单的详情
                where: { oid: { $in: list2 } },
                attributes: ['oid', 'dest', 'startTime', 'endTime', 'num', 'hasManager', 'applicant'],
                order: [['createdAt', 'DESC']],  // 根据订单创建时间排序
                offset: offset,
                limit: 5,
            })
            res.json({
                code: '20000',
                status: 'success',
                myOrderList: myOrderList.rows,
                count: myOrderList.count
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