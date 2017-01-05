'use strict';
const STATUS_CODE = require('../enums/status_code');

/**
 * 判断当前是否为ajax请求
 * @param req
 * @returns {boolean}
 */
exports.isAjaxRequest = function(req) {
    return req.isAjax?true:false;
}

/**
 * 追加contextPath
 * @param url   请求地址
 */
exports.appendContextPath = function(url) {
    let fullPath = __CONTEXT_PATH + url;
    if (/\/$/.test(__CONTEXT_PATH) && /^\//.test(url)) { // 判断是否存在两个“/”重叠的情况
        fullPath = __CONTEXT_PATH.replace(/\/$/, '') + url;
    } else if (!/\/$/.test(__CONTEXT_PATH) && !/^\//.test(url)) {
        fullPath = __CONTEXT_PATH + '/' + url;
    }
    return fullPath;
}

/**
 * 请求下个Promise
 * @param  {Object} err  错误信息
 * @param  {Object} data 传递数据
 * @return {Object}      Promise对象
 */
exports.nextPromise = function(err,data){
    return new Promise(function(resolve,reject){
        if(err) reject(err);
        else resolve(data);
    })
}

/**
 * 构建成功JSON
 * @param  {String} msg  返回信息
 * @param  {Object} data 返回数据
 * @return {Object}      
 */
exports.buildResJson = function(msg,data){
    let result=Object.create(null);
    result.msg=msg;
    result.code=STATUS_CODE.SUCCESS;
    result.data=data?data:null;
    return result;
}

/**
 * 设置登录token
 * @param {Object} res         返回对象
 * @param {String} cookieValue 登录key值
 */
exports.setToken = function(res,token){
    res.cookie(CONFIG.tokenName,token,{
        maxAge: CONFIG.tokenAge,
        // httpOnly: true,
        // secure: CONFIG.tokenSecure
    })
}