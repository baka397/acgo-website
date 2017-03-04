'use strict';
/**
 * Created by jie.ding on 2016/4/22.
 * 自动注入所有Controller
 */
const fs = require('fs');
const path = require('path');
const tool = require('./common/tool');
let auth = require('./middlewares/auth');
module.exports = function(app) {
    // 读取当前路径下所有controller process.cwd()
    let controllerDir = path.join(__dirname, 'controllers/web');
    let files = fs.readdirSync(controllerDir);
    for (let i in files) {
        let filename = files[i];
        let controller = require(path.join(controllerDir, filename));
        app.use(tool.appendContextPath(controller.requestMapping), controller.router);
    }
    // 读取api目录下的所有文件
    let controllerApiDir = path.join(__dirname, 'controllers/api/');
    let filesApi = fs.readdirSync(controllerApiDir);
    for (let i in filesApi) {
        let filename = filesApi[i];
        let controller = require(path.join(controllerApiDir, filename));
        app.use('/api'+controller.requestMapping, auth.getToken, function(req, res, next){
            req.isAjax=true;
            next();
        }, controller.router);
    }
};