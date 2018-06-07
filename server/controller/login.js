var jwt = require('jsonwebtoken');
var secretKey = "Hello Brohua"  //加密token
const User = require('./../model/model').User

module.exports = {
    login_validate(req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        User.findOne({ where: { username: username, password: password } }).then((result) => {
            if (result === null) {
                res.json({
                    code: '50001',
                    status: 'fail',
                    msg: '用户名或密码错误！'
                })
            } else {
                res.json({
                    code: '20000',
                    status: 'success',
                    token: jwt.sign({
                        name: "Brohua"
                    }, secretKey, {
                            expiresIn: "2h"
                        }),
                    uid: result.uid
                })
            }
        }).catch(() => {
            
        })
    },

    getInfo_validate(req, res, next) {
        let uid = req.body.uid;
        User.findOne({ where: { uid: uid } }).then(result => {
            res.json({
                code: '20000',
                status: 'success',
                username: result.username,
                dept: result.dept,
            })
        })
        
    }
}
