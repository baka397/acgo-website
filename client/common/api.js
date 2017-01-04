import fetch from 'isomorphic-fetch';
import {apiPath} from '../config';
import {nextPromise} from './tool';
const URLS={
    register:'/register'
}
let customHeader=new Headers({
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
});
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
        method:'get',
        headers:customHeader
    }
    if(method) option.method=method.toLowerCase();
    if(data){
        switch(option.method){
            case 'get':
                path+=(/\?/.test(path) ? '&' : '?')+querystring.stringify(data);
                break;
            default:
                option.body=JSON.stringify(data);
        }
    }
    return fetch(apiPath+path,option).then(response => response.json()).then(function(data){
        if(data.code!==200) return nextPromise(new Error(data.msg));
        return nextPromise(null,data.data);
    })
}
exports.fetch=fetchPost;