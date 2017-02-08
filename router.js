'use strict';
/**
 * Created by jie.ding on 2016/4/22.
 * 自动注入所有Controller
 */
const fs = require('fs');
const path = require('path');
const tool = require('./common/tool');
module.exports = function(app) {
    // 读取当前路径下所有controller process.cwd()
    let controllerDir = path.join(__dirname, 'controllers');
    let files = fs.readdirSync(controllerDir);
    for (let i in files) {
        let filename = files[i];
        let controller = require(path.join(controllerDir, filename));
        app.use(tool.appendContextPath(controller.requestMapping), controller.router);
    }
};