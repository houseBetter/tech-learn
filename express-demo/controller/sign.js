const validator = require('validator');
const eventProxy = require('eventproxy');
exports.signup = function(req, res, next) {
  console.log('body:', req);
  var loginname = validator.trim(req.body.loginname).toLowerCase();
  var email     = validator.trim(req.body.email).toLowerCase();
  var pass      = validator.trim(req.body.pass);
  var rePass    = validator.trim(req.body.re_pass);
  var ep = new eventProxy();
  ep.fail(next);
  ep.on('prop_err', function(err){
    res.status(422);
    res.render('login/signup.art', {error: msg, loginname: loginname, email: email});

  })
} 