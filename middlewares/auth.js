'use strict';
const api = require('../common/api');

exports.getUser=function(req,res,next){
    if(req.token){
        api.request(req.token,'userInfo').then(function(data){
            req.user=data;
            next();
        }).catch(function(err){
            res.clearCookie(CONFIG.tokenName);
            next();
        })
    }else next();
}

exports.getToken=function(req,res,next){
    req.token=req.cookies[CONFIG.tokenName];
    next();
}