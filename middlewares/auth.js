'use strict';
const api = require('../common/api');

exports.getUser=function(req,res,next){
    let userToken=req.cookies.token;
    if(userToken){
        api.request(api.urls.userInfo,null,'GET',userToken).then(function(data){
            req.user=data;
        }).catch(function(err){
            res.clearCookie(token);
            next();
        })
    }else next();
}