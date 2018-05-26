var express = require('express');
var router = express.Router();
const { login_validate, getInfo_validate } = require('./../controller/login');
const { startNewOrder } = require('./../controller/start')
const { signUp } = require('./../controller/signup')
const { getOrderList, getPeopleList, join, quit } = require('./../controller/find')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', login_validate);  //登录接口

router.post('/info', getInfo_validate)  //获取用户信息接口

router.post('/start', startNewOrder)    //发起拼车

router.post('/signup', signUp)        //用户注册

router.post('/list', getOrderList)  //获取拼车订单列表

router.post('/people', getPeopleList)  //获取一个拼车订单内的人员

router.post('/join', join)  //加入拼车

router.post('/quit', quit)  //退出拼车

module.exports = router;
