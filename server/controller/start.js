let moment = require('moment');
const Order = require('./../model/model').Order
const Ordering = require('./../model/model').Ordering

function random6numbers() {
    var num = "";
    for (var i = 0; i < 6; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

module.exports = {
    async startNewOrder(req, res, next) {
        let form = req.body.form;
        let uid = req.body.uid;
        form.oid = `MYPC${moment().format('YYYYMMDD')}${random6numbers()}`; // 生成随机订单号
        form.dest = form.dest.slice(1).toString();
        form.startTime = moment(form.startTime).format('YYYY-MM-DD HH:mm:ss');  // 格式化时间
        form.endTime = moment(form.endTime).format('YYYY-MM-DD HH:mm:ss');
        try {
            await Order.create(form);   // 在Order表添加订单
            await Ordering.create({ userUid: uid, orderOid: form.oid });    // 在关联表Ordering添加关联信息
            res.json({
                code: '20000',
                status: 'success',
            })
            next();
        } catch (error) {
            res.json({
                code: '40003',
                status: 'fail',
                msg: error.message
            })
        }
    },
}