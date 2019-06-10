const express = require('express');
const router = express.Router();
const sign = require('../controller/sign');
router.get('/', (req, res) => {
  res.render('index/index.art');
})
router.get('/start', (req, res) => {
  res.render('start/start.art');
})
router.get('/api', (req, res) => {
  res.render('api/api.art');
})
router.get('/about', (req, res) => {
  res.render('about/about');
})
// 注册页面
router.get('/signup', (req, res) => {
  res.render('login/signup.art');
})
// 提交注册信息
router.post('/signup', sign.signup);
// 登录页面
router.get('/signin',sign.showLogin);
// 登录请求
router.post('/signin', sign.login);


module.exports = router;