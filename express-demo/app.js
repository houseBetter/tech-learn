 const express = require('express');
 const app = express();
 const router = require('./router/router');
 const viewEngine = require('express-art-template');
 const path = require('path');
//  配置模板引擎
 app.set('views', path.join(__dirname, 'views'));
 app.engine('art', viewEngine);
//  配置路由
 app.use('/', router)
 app.listen(9900, () => {
  console.log("Run in localhost:9900");
 })
 module.exports = app;