import {maxUploadSize,uploadPath} from '../config';
import {fetch} from './api';

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
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
exports.isObjEmpty = isObjEmpty;

/**
 * 请求下个Promise
 * @param  {Object} err  错误信息
 * @param  {Object} data 传递数据
 * @return {Object}      Promise对象
 */
function nextPromise(err,data){
    return new Promise(function(resolve,reject){
        if(err) reject(err);
        else resolve(data);
    })
}
exports.nextPromise = nextPromise;

/**
 * 格式化数据
 * @param  {Object} data 数据对象
 * @return {String}      URL用数据
 */
exports.serialize = function(data){
    let str='';
    for(let key in data){
        str+=key+'='+encodeURIComponent(data[key])+'&';
    }
    str=str.replace(/\&$/,'');
    return str;
}

/**
 * 获取查询数据
 * @param  {Object} routing 路由对象
 * @return {Object}         查询数据
 */
exports.getQuery = function(routing){
    let query=Object.assign({},routing.locationBeforeTransitions.query);
    return query;
}

/**
 * 获取枚举数组
 * @param  {Object} enumObj 枚举对象
 * @return {Array}          格式化后的数组
 */
exports.getEnumArray = function(enumObj){
    return Object.keys(enumObj).map((key)=>{
        return {
            value:key,
            name:enumObj[key]
        }
    })
}

/**
 * 上传图片
 * @param  {Object} file 文件对象
 * @return {Object}      Promise对象
 */
exports.upload = function(file){
    let error;
    if(maxUploadSize&&file.size>maxUploadSize){
        let sOutput;
        for (let aMultiples = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], nMultiple = 0, nApprox = maxUploadSize / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            sOutput = parseInt(nApprox) + aMultiples[nMultiple];
        }
        error = new Error('上传文件超过指定文件限制，文件必须小于' + sOutput);
        return nextPromise(error);
    }
    return fetch('uploadToken').then((data)=>{
        let formInfo = new FormData();
        formInfo.append('token',data.data.token);
        formInfo.append('key',data.data.key);
        formInfo.append('file',file);
        return fetch('upload',formInfo,'file')
    });
}