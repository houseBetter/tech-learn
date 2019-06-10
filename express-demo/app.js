 const express = require('express');
 const app = express();
 const router = require('./router/router');
 const viewEngine = require('express-art-template');
 const path = require('path');
 const _ = require('lodash');
 const Loader = require('Loader');
 const LoaderConnect = require('loader-connect');
 const config = require('./config');
 const bodyParser = require('body-parser');
 const session = require('express-session');
 const RedisStore = require('connect-redis')(session);
 //  配置模板引擎
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'art');
 app.engine('art', viewEngine);
 //  编译less文件成css文件
 app.use(LoaderConnect.less(__dirname));
_.extend(app.locals, {
  Loader: Loader,
  assets: {},
  config: config
});
_.extend(app.locals, require('./utils/render_helper'));

//  配置资源目录
 app.use('/public', express.static(path.join(__dirname, 'public')));
//  中间件
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(require('cookie-parser')(config.session_secret));
app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host,
    db: config.redis_db,
    pass: config.redis_password,
  }),
  resave: false,
  saveUninitialized: false,
}));
//  模板引擎全局变量
 app.listen(9900, () => {
  console.log("Run in localhost:9900");
 })
 //  配置路由
 app.use('/', router)
 module.exports = app;