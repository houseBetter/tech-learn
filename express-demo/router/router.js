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
  res.render('about/about.art');
})
// 注册页面
router.get('/signup', (req, res) => {
  res.render('login/signup.art');
})
router.get('/signin', (req, res) => {
  res.render('login/signin.art');
})
// router.get('/test', (req, res) => {
//   res.render('test.art');
// })

// 提交注册信息
router.post('/signup', sign.signup);
module.exports = router;