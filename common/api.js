'use strict';
const queryString = require('querystring');
const PATH = CONFIG.apiPath;
const request = require('superagent');
const authTool = require('./auth');
const tool = require('./tool');
const STATUS_CODE = require('../enums/status_code');
const URL = {
    userInfo: '/user/me',
    register: '/user/',
    login:'/user/login/',
    anime:'/anime/',
    animeEdit:'/anime/:id',
    animeSub:'/anime/sub/:id',
    animeSubList:'/anime/sub/me',
    animeDetail:'/anime/:id',
    animeAuditGet:'/anime/audit/me',
    animeAuditPost:'/anime/audit/:id',
    animeWatchList:'/anime-group/watch/',
    uploadToken:'/upload/token/',
    tag:'/tag/'
}
let apiTokenParams=authTool.getTokenParams(CONFIG.apiKey,CONFIG.apiAlias);

/**
 * 请求接口数据
 * @param  {String} token  用户token
 * @param  {String} action 动作名称
 * @param  {Object} data   发送数据
 * @param  {String} method 请求类型
 * @return {Object}        Promise对象
 */
function apiRequest(token,action,data,method){
    let url = URL[action];
    if(!url){
        let error = new Error('无效的API请求地址');
        error.status = STATUS_CODE.ERROR;
        return tool.nextPromise(error);
    }
    url = PATH+url;
    let idReg=/\:id/;
    if(idReg.test(url)){
        url=url.replace(idReg,data.id);
        delete data.id;
    }
    method=method?method.toLowerCase():'get';
    if (method === 'get' && !tool.isObjEmpty(data)) {
        url += (/\?/.test(url) ? '&' : '?') + queryString.stringify(data);
    }
    LOG.info(method.toUpperCase(),url);
    return new Promise(function(resolve,reject){
        let apiLoginParams=Object.assign({},apiTokenParams);
        if(token) apiLoginParams['x-req-key']=token;
        let requestObj=request[method](url)
        .timeout({
            response: 5000,  // Wait 5 seconds for the server to start sending,
            deadline: 60000, // but allow 1 minute for the file to finish loading.
        })
        .set(apiLoginParams)
        if(method!=='get'&&!tool.isObjEmpty(data)){
            requestObj.send(data);
            LOG.info('请求数据');
            LOG.info(data);
        }
        requestObj.end(function(err,res){
            //处理超时错误
            if((err&&parseInt(err.status)===408)||!res){
                LOG.error(err);
                return reject(err);
            }
            LOG.info(res.body);
            if(res.status===200&&res.body.code===STATUS_CODE.SUCCESS){
                return resolve(res.body.data);
            }else{
                let error = new Error(res.body.msg||'API处理错误');
                error.status = res.body.code||res.status;
                return reject(error);
            }
        })
    })
}
exports.request=apiRequest;