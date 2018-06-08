const Order = require('./../model/model').Order
const Ordering = require('./../model/model').Ordering
const User = require('./../model/model').User
const sequelize = require('./../model/newSeq')

module.exports = {
    async getOrderList(req, res, next) {
        let offset = (req.body.page - 1) * 5;   // 偏移量=(当前页码-1)*每页数目
        try {
            let OrderList = await Order.findAndCountAll(
                {
                    attributes: ['oid', 'dest', 'startTime', 'endTime', 'num', 'hasManager', 'applicant'],
                    order: [['createdAt', 'DESC']],  // 根据订单创建时间排序
                    offset: offset,
                    limit: 5,
                }
            );
            res.json({
                code: '20000',
                status: 'success',
                OrderList: OrderList.rows,
                count: OrderList.count
            })
        } catch (error) {
            res.json({
                code: '40003',
                status: 'fail',
                msg: error.message
            })
        }
    },
    async getPeopleList(req, res, next) {
        let oid = req.body.oid;
        try {
            let list = await Ordering.findAndCount({
                where: { orderOid: oid },
                attributes: ['userUid'],
            });
            let list2 = [];
            for (let i of list.rows) {
                list2.push(i.userUid);
            }

            let list3 = await User.findAll({ where: { uid: { $in: list2 } }, attributes: ['username', 'realname', 'dept', 'phone'] })
            res.json({
                code: '20000',
                status: 'success',
                UidList: list.rows,
                userInfoList: list3,
                count: list.count
            })
        } catch (error) {
            res.json({
                code: '40003',
                status: 'fail',
                msg: error.message
            })
        }
    },
    async join(req, res, next) {
        let oid = req.body.oid;
        let uid = req.body.uid;
        try {
            let count = await Ordering.count({ where: { orderOid: oid } });
            console.log(count);
            if (count === 6) {
                throw new Error('拼车人数已满！')
            } else {
                await Ordering.create({ orderOid: oid, userUid: uid });
                // await Order.findOne({ where: { oid: oid } }).then(order => {
                //     order.increment('num')
                // });
                await Order.update({ num: count + 1 }, { where: { oid: oid } });
                res.json({
                    code: '20000',
                    status: 'success',
                })
            }
        } catch (error) {
            res.json({
                code: '40003',
                status: 'fail',
                msg: error.message
            })
        }
    },
    async quit(req, res, next) {
        let oid = req.body.oid;
        let uid = req.body.uid;
        try {
            let count = await Ordering.count({ where: { orderOid: oid } });
            if (count === 1) {
                throw new Error('只剩1人无法退出！')
            } else {
                let destroyResult = await Ordering.destroy({ where: { orderOid: oid, userUid: uid } });
                if (destroyResult === 0) {
                    throw new Error('您不在此拼车订单内！')
                } else {
                    await Order.update({ num: count - 1 }, { where: { oid: oid } });
                    res.json({
                        code: '20000',
                        status: 'success',
                    })
                }
            }
        } catch (error) {
            res.json({
                code: '40003',
                status: 'fail',
                msg: error.message
            })
        }
    }
}