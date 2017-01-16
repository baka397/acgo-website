import {maxUploadSize,uploadPath,downloadPath,pageSize} from '../config';
import {fetch} from './api';

const IS_CLIENT = false;

export function isObjEmpty(obj) {
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

/**
 * 检测角色
 * @param  {String} roleName   角色名称
 * @param  {String} roleString 角色列表
 * @return {Boolen}            是否有该角色
 */
export function authRole(roleName,roleString){
    let roleArray=roleString.split(',');
    return roleArray.indexOf(roleName)>=0;
}

/**
 * 请求下个Promise
 * @param  {Object} err  错误信息
 * @param  {Object} data 传递数据
 * @return {Object}      Promise对象
 */
export function nextPromise(err,data){
    return new Promise(function(resolve,reject){
        if(err) reject(err);
        else resolve(data);
    })
}

/**
 * 格式化数据
 * @param  {Object} data 数据对象
 * @return {String}      URL用数据
 */
export function serialize(data){
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
export function getQuery(routing){
    if(!routing) return {};
    let query=Object.assign({},routing.location.query);
    return query;
}

export function getParams(routing){
    if(!routing) return {};
    let params=Object.assign({},routing.params);
    return params;
}

/**
 * 获取枚举数组
 * @param  {Object} enumObj 枚举对象
 * @return {Array}          格式化后的数组
 */
export function getEnumArray(enumObj){
    return Object.keys(enumObj).map((key)=>{
        return {
            value:key,
            name:enumObj[key]
        }
    })
}

/**
 * 获取文件大小信息
 * @param  {Number} size kb数
 * @return {String}      实际大小
 */
export function getSizeInfo(size){
    let sOutput;
    for (let aMultiples = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], nMultiple = 0, nApprox = size / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        sOutput = parseInt(nApprox) + aMultiples[nMultiple];
    }
    return sOutput;
}

/**
 * 上传图片
 * @param  {Object} file 文件对象
 * @return {Object}      Promise对象
 */
export function upload(file){
    let error;
    if(maxUploadSize&&file.size>maxUploadSize){
        error = new Error('上传文件超过指定文件限制，文件必须小于' + getSizeInfo(maxUploadSize));
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

/**
 * 获取图片地址
 * @param  {String} key      图片key值
 * @param  {String} cropInfo 图片裁剪数据
 * @param  {Number} width    图片缩放宽度
 * @return {String}          最终图片地址
 */
export function getImageUrl(key,cropInfo,width){
    if(!key) return null;
    if(!cropInfo){
        return downloadPath+'/'+key;
    }else{
        let cropArray=Array.isArray(cropInfo)?cropInfo:cropInfo.split(',');
        let imageUrl=downloadPath+'/'+key;
        //裁剪
        imageUrl+='?imageMogr2/crop/!'+cropArray[2]+'x'+cropArray[3]+'a'+cropArray[0]+'a'+cropArray[1];
        if(width) imageUrl+='/thumbnail/'+width+'x';
        return imageUrl;
    }
}

/**
 * 获取对象对比数据结果
 * @param  {Object} newData 新数据
 * @param  {Object} oldData 旧数据
 * @return {Object}         结果数据
 */
export function getObjCompareResult(newData,oldData){
    let result = {};
    for(let key in newData){
        let oldDataKey=key.replace(/([A-Z])/g,'_$1').toLowerCase();
        let curData=newData[key];
        let curOldData=oldData[oldDataKey];
        switch(getObjType(curOldData)){
            case 'array':
                if(curData.toString()!==curOldData.toString()){
                    result[key]=curData;
                }
                break;
            case 'object':
                if(JSON.stringify(curData)!==JSON.stringify(curOldData)){
                    result[key]=curData;
                }
                break;
            case 'number':
                if(parseFloat(curData)!==parseFloat(curOldData)){
                    result[key]=curData;
                }
                break;
            default:
                if(curData!==curOldData){
                    result[key]=curData;
                }
        }
    }
    if(isObjEmpty(result)) return null;
    else return result;
}

/**
 * 获取对象类型
 * @param  {Object} obj 对象
 * @return {String}     对象类型
 */
export function getObjType(obj){
    let resultType=typeof obj;
    switch(resultType){
        case 'object':
            if(Array.isArray(obj)) resultType='array';
            break;
    }
    return resultType;
}
/**
 * 获取页码
 * @param  {Number} no 当前数字
 * @return {Number}    页码
 */
export function getPage(no){
    return Math.ceil(no/pageSize);
}

/**
 * 获取客户端状态
 * @return {Boolean} 是否在客户端内
 */
export function isClent(){
    return IS_CLIENT;
}