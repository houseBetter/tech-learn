const validator = require('validator');
const eventproxy = require('eventproxy');
const proxy = require('../proxy');
const User = proxy.User;
const tools = require('../common/tools');
const authMiddleWare = require('../middlewares/auth');
exports.signup = function(req, res, next) {
  // console.log('body:', req);
  var loginname = validator.trim(req.body.loginname).toLowerCase();
  var email     = validator.trim(req.body.email).toLowerCase();
  var pass      = validator.trim(req.body.pass);
  var rePass    = validator.trim(req.body.re_pass);
  var ep = new eventproxy();
  ep.fail(next);
  ep.on('prop_err', function(msg){
    res.status(422);
    res.render('login/signup.art', {error: msg, loginname: loginname, email: email});
  })

  // 验证信息的正确性
  if ([loginname, pass, rePass, email].some(function (item) { return item === ''; })) {
    ep.emit('prop_err', '信息不完整。');
    return;
  }
  if (loginname.length < 5) {
    ep.emit('prop_err', '用户名至少需要5个字符。');
    return;
  }
  if (!tools.validateId(loginname)) {
    return ep.emit('prop_err', '用户名不合法。');
  }
  if (!validator.isEmail(email)) {
    return ep.emit('prop_err', '邮箱不合法。');
  }
  if (pass !== rePass) {
    return ep.emit('prop_err', '两次密码输入不一致。');
  }
  User.getUsersByQuery({'$or': [
    {'loginname': loginname},
    {'email': email}
  ]}, {}, function(err, users) {
    if (err) {
      return next(err);
    }
    if (users.length > 0) {
      ep.emit('prop_err', '用户名或邮箱已被使用。');
      return;
    }
  })
} 
exports.showLogin = function (req, res) {
  req.session._loginReferer = req.headers.referer;
  res.render('login/signin.art');
};

exports.login = function (req, res, next) {
  var loginname = validator.trim(req.body.name).toLowerCase();
  var pass      = validator.trim(req.body.pass);
  var ep        = new eventproxy();

  ep.fail(next);

  if (!loginname || !pass) {
    res.status(422);
    return res.render('sign/signin', { error: '信息不完整。' });
  }

  var getUser;
  if (loginname.indexOf('@') !== -1) {
    getUser = User.getUserByMail;
  } else {
    getUser = User.getUserByLoginName;
  }

  ep.on('login_error', function (login_error) {
    res.status(403);
    res.render('sign/signin', { error: '用户名或密码错误' });
  });

  getUser(loginname, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return ep.emit('login_error');
    }
    var passhash = user.pass;
    tools.bcompare(pass, passhash, ep.done(function (bool) {
      if (!bool) {
        return ep.emit('login_error');
      }
      if (!user.active) {
        // 重新发送激活邮件
        mail.sendActiveMail(user.email, utility.md5(user.email + passhash + config.session_secret), user.loginname);
        res.status(403);
        return res.render('sign/signin', { error: '此帐号还没有被激活，激活链接已发送到 ' + user.email + ' 邮箱，请查收。' });
      }
      // store session cookie
      authMiddleWare.gen_session(user, res);
      //check at some page just jump to home page
      var refer = req.session._loginReferer || '/';
      for (var i = 0, len = notJump.length; i !== len; ++i) {
        if (refer.indexOf(notJump[i]) >= 0) {
          refer = '/';
          break;
        }
      }
      res.redirect(refer);
    }));
  });
};
const notJump = [
  '/active_account', //active page
  '/reset_pass',     //reset password page, avoid to reset twice
  '/signup',         //regist page
  '/search_pass'    //serch pass page
];