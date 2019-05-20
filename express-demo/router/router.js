const express = require('express');
const router = express.Router();
const models = require('../models');
const artDataTemplate = models.artDataTemplate;
router.get('/', (req, res) => {
  artDataTemplate.type = 'index';
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