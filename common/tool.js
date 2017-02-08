'use strict';
const STATUS_CODE = require('../enums/status_code');

exports.filterReqLog = function(data){
    let result=Object.assign({},data);
    if(result.password) delete result.password;
    if(result.oldPassword) delete result.oldPassword;
    return JSON.stringify(result);
};

/**
 * 判断当前是否为ajax请求
 * @param req
 * @returns {boolean}
 */
exports.isAjaxRequest = function(req) {
    return req.isAjax?true:false;
};

/**
 * 追加contextPath
 * @param url   请求地址
 */
exports.appendContextPath = function(url) {
    let fullPath = global.__CONTEXT_PATH + url;
    if (/\/$/.test(global.__CONTEXT_PATH) && /^\//.test(url)) { // 判断是否存在两个“/”重叠的情况
        fullPath = global.__CONTEXT_PATH.replace(/\/$/, '') + url;
    } else if (!/\/$/.test(global.__CONTEXT_PATH) && !/^\//.test(url)) {
        fullPath = global.__CONTEXT_PATH + '/' + url;
    }
    return fullPath;
};

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
    });
};

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
};

/**
 * 设置登录token
 * @param {Object} res         返回对象
 * @param {String} cookieValue 登录key值
 */
exports.setToken = function(res,token){
    res.cookie(global.CONFIG.tokenName,token,{
        maxAge: global.CONFIG.tokenAge,
        // httpOnly: true,
        // secure: CONFIG.tokenSecure
    });
};

function isObjEmpty(obj) {
    // Speed up calls to hasOwnProperty
    let hasOwnProperty = Object.prototype.hasOwnProperty;

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== 'object') return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
exports.isObjEmpty = isObjEmpty;