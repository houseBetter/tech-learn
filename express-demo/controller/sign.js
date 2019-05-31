const validator = require('validator');
// loginname: 
// pass: 
// re_pass: 
// email: 
// _csrf: 
exports.signup = function(req, res, next) {
  res.status(422);
  res.render('login/signup.art', {error: '错误'});
} 