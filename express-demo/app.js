 const express = require('express');
 const app = express();
 const router = require('./router/router');
 const viewEngine = require('express-art-template');
 const path = require('path');
 const _ = require('lodash');
 const Loader = require('Loader');
 const LoaderConnect = require('loader-connect');
 const config = require('./config');

 //  配置模板引擎
 app.set('views', path.join(__dirname, 'views'));
 app.engine('art', viewEngine);
 //  编译less文件成css文件
 app.use(LoaderConnect.less(__dirname));
_.extend(app.locals, {
  Loader: Loader,
  assets: {},
  config: config
});
_.extend(app.locals, require('./utils/render_helper'));
//  配置路由
 app.use('/', router)
//  配置资源目录
 app.use('/public', express.static(path.join(__dirname, 'public')));
//  模板引擎全局变量
 app.listen(9900, () => {
  console.log("Run in localhost:9900");
 })
 module.exports = app;