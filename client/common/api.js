import fetch from 'isomorphic-fetch';
import {apiPath} from '../config';
import {nextPromise,serialize} from './tool';
const URLS={
    register:'/register', //用户注册
    login:'/login', //用户登录
    logout:'/logout', //用户登出
    me:'/me', //用户自有信息
}
let customHeader={
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json;charset=UTF-8'
}
/**
 * Fetch请求
 * @param  {String} path   请求路径
 * @param  {Object} data   请求参数
 * @param  {String} method 请求类型
 * @return {Object}        Promise对象
 */
function fetchPost(action,data,method){
    let path = URLS[action];
    if(!path) return nextPromise(new Error('无效的API地址'));
    let option={
        method:method?method.toLowerCase():'get',
        credentials:'include',
        headers:customHeader
    }
    if(data){
        switch(option.method){
            case 'get':
                path+=(/\?/.test(path) ? '&' : '?')+serialize(data);
                break;
            default:
                option.body=JSON.stringify(data);
        }
    }
    return fetch(apiPath+path,option).then(response => response.json()).then(function(data){
        if(data.code!==200) return nextPromise(new Error(data.msg));
        return nextPromise(null,data);
    })
}
exports.fetch=fetchPost;