'use strict';
const queryString = require('querystring');
const PATH = CONFIG.apiPath;
const request = require('superagent');
const authTool = require('./auth');
const STATUS_CODE = require('../enums/status_code');
const URL = {
    userInfo: PATH+'/user/me/'
}
let apiTokenParams=authTool.getTokenParams(CONFIG.apiKey,CONFIG.apiAlias);

function apiRequest(url,data,method,token){
    method=method?method.toLowerCase():'get';
    if (method === 'get' && data) {
        url += (/\?/.test(url) ? '&' : '?') + queryString.stringify(data);
    }
    LOG.info('开始请求API,请求类型:',method,',请求地址:'+url);
    return new Promise(function(resolve,reject){
        let apiLoginParams=Object.assign({},apiTokenParams);
        if(token) apiLoginParams['x-req-key']=token;
        let requestObj=request[method](url)
        .timeout({
            response: 5000,  // Wait 5 seconds for the server to start sending,
            deadline: 60000, // but allow 1 minute for the file to finish loading.
        })
        .set(token)
        if(method!=='get'&&data){
            requestObj.send(data);
            LOG.info(data);
        }
        requestObj.end(function(err,res){
            if(err){
                LOG.error(err);
                return reject(err);
            }
            LOG.info(res.body);
            if(res.code!==200||res.body.code!==STATUS_CODE.SUCCESS){
                return resolve(res.body.data);
            }else{
                let error = new Error(res.body.msg||'API处理错误');
                error.status = res.body.code||res.status;
                return reject(error);
            }
        })
    })
}

exports.urls=URL;
exports.request=apiRequest;