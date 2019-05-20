const express = require('express');
const router = express.Router();
const models = require('../models');
const artDataTemplate = models.artDataTemplate;
router.get('/', (req, res) => {
  artDataTemplate.type = 'index';
  // res.locals传入模板中的数据
  res.locals = artDataTemplate;
  res.render('index.art');
})
router.get('/start', (req, res) => {
  artDataTemplate.type = 'start';
  res.render('index.art', artDataTemplate);
})
router.get('/api', (req, res) => {
  artDataTemplate.type = 'api';
  res.render('index.art', artDataTemplate);
})
router.get('/about', (req, res) => {
  artDataTemplate.type = 'about';
  res.render('index.art', artDataTemplate);
})
router.get('/signup', (req, res) => {
  artDataTemplate.type = 'signup';
  res.render('index.art', artDataTemplate);
})
router.get('/signin', (req, res) => {
  artDataTemplate.type = 'signin';
  res.render('index.art', artDataTemplate);
})
module.exports = router;