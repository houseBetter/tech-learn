const validator = require('validator');
const models = require('../models');
const artDataTemplate = models.artDataTemplate;
exports.signup = function(req, res, next) {
  res.status(422);
  artDataTemplate.type = 'signup';
  res.render('index.art', artDataTemplate);
} 