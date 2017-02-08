'use strict';
const api = require('../common/api');

exports.getUser=function(req,res,next){
    if(req.token){
        api.request(req.token,'userInfo').then(function(data){
            req.user=data;
            next();
        }).catch(function(){
            res.clearCookie(global.CONFIG.tokenName);
            next();
        });
    }else next();
};

exports.getToken=function(req,res,next){
    req.token=req.cookies[global.CONFIG.tokenName];
    next();
};