'use strict';
const pkg = require('../package.json');

// 默认配置
let defaultConfig = {
    project: {
        port: 8001,                                         // 项目端口
        name: pkg.name,                                     // 项目名称
        version: pkg.version                                // 项目版本
    },
    log: {
        path: './logs/',                                    // 日志路径
        type: 'console',                                    // 日志打印类型：console、fileLog、dateFileLog
        level: 'debug'                                      // 日志打印级别：trace、debug、info、warn、error、fatal
    },
    tokenName:'acgosid',                                    // API token名称
    tokenAge: 90*24*60*60*1000,                             // token过期时间(毫秒)
    tokenSecure: false,                                     // 是否仅https有效
    clientVersionLimit: '1.2.0',                            // 最小客户端版本
    //api信息
    apiPath:'http://127.0.0.1:8000/api/v1',                 // API地址
    apiAlias:'client',                                      // API项目名称
    apiKey:'58635a0551d5f413bc969616'                       // API秘钥
};

// 启动配置，部署环境变量：dev、test、uat、online
let startupConfig = process.env.CFG_PATH || ('./config-' + (process.env.NODE_ENV || 'dev'));
// 获取环境配置
let config = {};
try {
    global.console.log('启动配置文件：%s', startupConfig);
    config = require(startupConfig);
} catch(e) {
    global.console.error('未找到启动配置：%s', startupConfig);
}
// 获取当前部署环境对应配置
config = Object.assign({}, defaultConfig, config || {});

module.exports = config;