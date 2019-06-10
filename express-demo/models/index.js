// // 模板引擎装填内容的格式
// const artDataTemplate = {
//   header: null,
//   content: {
//     type: null, //index(首页), about(关于我们), signin(注册), signup(登录)

//   }
// }
// module.exports = {
//   artDataTemplate
// }
var mongoose = require('mongoose');
var config   = require('../config');
var logger = require('../common/logger')

mongoose.connect(config.db, {
  poolSize: 20,
  useCreateIndex: true,
  useNewUrlParser: true
}, function (err) {
  if (err) {
    logger.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./user');
require('./topic');
require('./reply');
require('./topic_collect');
require('./message');

exports.User         = mongoose.model('User');
exports.Topic        = mongoose.model('Topic');
exports.Reply        = mongoose.model('Reply');
exports.TopicCollect = mongoose.model('TopicCollect');
exports.Message      = mongoose.model('Message');