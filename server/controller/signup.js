const User = require('./../model/model').User

module.exports = {
    async signUp(req, res, next) {
        let signUpform = req.body;
        delete signUpform.check_password;
        try {
            await User.create(signUpform);      // 在数据库user表插入用户信息
            res.json({
                code: '20000',
                status: 'success',
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