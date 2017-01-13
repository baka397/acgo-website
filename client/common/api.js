import fetch from 'isomorphic-fetch';
import {apiPath,uploadPath} from '../config';
import {nextPromise,serialize} from './tool';
const URLS={
    register:apiPath+'/register', //用户注册
    login:apiPath+'/login', //用户登录
    logout:apiPath+'/logout', //用户登出
    me:apiPath+'/me', //用户自有信息
    animeSearch:apiPath+'/anime/', //动画搜索
    animeDetail:apiPath+'/anime/detail/', //动画详情
    animeAdd:apiPath+'/anime/add/', //动画添加
    animeEdit:apiPath+'/anime/edit/', //动画编辑
    animeSub:apiPath+'/anime/sub/', //动画订阅
    animeSubList:apiPath+'/anime/sub/', //动画订阅数据
    animeWatchList:apiPath+'/anime/watch/', //动画观看数据
    animeAudit:apiPath+'/anime/audit/', //动画审核数据
    uploadToken:apiPath+'/uploadToken/', //获取上传token
    tag:apiPath+'/tag/', //获取标签
    tagAdd:apiPath+'/tag/add', //增加标签
    upload:uploadPath+'/' //上传文件地址
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
        method:method?method.toLowerCase():'get'
    }
    switch(method){
        case 'file':
            option.mode='cors';
            break;
        default:
            option.credentials='include';
            option.headers=customHeader;
    }
    if(data){
        switch(option.method){
            case 'file':
                option.method='post';
                option.body=data;
                break;
            case 'get':
                path+=(/\?/.test(path) ? '&' : '?')+serialize(data);
                break;
            default:
                option.body=JSON.stringify(data);
        }
    }
    return fetch(path,option).then(response => response.json()).then(function(data){
        if(method==='file'){
            return nextPromise(null,data.key);
        }else{
            if(data.code!==200) return nextPromise(new Error(data.msg));
            return nextPromise(null,data);
        }
    })
}
exports.fetch=fetchPost;