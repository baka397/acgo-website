'use strict';
let express = require('express');
let router = express.Router();
let tool = require('../common/tool');
let api = require('../common/api');
let auth = require('../middlewares/auth');

exports.requestMapping = '/api';

router.all('*', auth.getToken, function(req, res, next){
    req.isAjax=true;
    next();
});

router.post('/register', function(req, res, next){
    let sendData={
        email:req.body.email,
        code:req.body.code,
        nickname:req.body.nickname,
        password:req.body.password
    }
    api.request(req.token,'register',sendData,'POST').then(function(data){
        res.send(tool.buildResJson('注册成功',null));
    }).catch(function(err){
        next(err);
    })
});

router.post('/login', function(req, res, next){
    let sendData={
        email:req.body.email,
        password:req.body.password
    }
    api.request(req.token,'login',sendData,'POST').then(function(data){
        console.log(data);
        tool.setToken(res,data.key);
        res.send(tool.buildResJson('登录成功',null));
    }).catch(function(err){
        next(err);
    })
});

router.get('/me', function(req, res, next){
    api.request(req.token,'userInfo').then(function(data){
        res.send(tool.buildResJson('获取个人数据成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.post('/logout', function(req, res, next){
    api.request(req.token,'userInfo',null,'DELETE').then(function(data){
        res.clearCookie(CONFIG.tokenName);
        res.send(tool.buildResJson('登出成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.get('/anime/', function(req, res, next){
    api.request(req.token,'anime',{
        keyword:req.query.keyword,
        page:req.query.page
    }).then(function(data){
        res.send(tool.buildResJson('获取数据成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.post('/anime/add/', function(req, res, next){
    api.request(req.token,'anime',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('添加成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.get('/uploadToken', function(req, res, next){
    api.request(req.token,'uploadToken').then(function(data){
        res.send(tool.buildResJson('获取token成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.get('/tag', function(req, res, next){
    api.request(req.token,'tag',{
        type:req.query.type,
        keyword:req.query.keyword,
        ids:req.query.ids
    }).then(function(data){
        res.send(tool.buildResJson('获取标签成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.post('/tag/add', function(req, res, next){
    api.request(req.token,'tag',{
        name:req.body.name,
        type:req.body.type
    },'POST').then(function(data){
        res.send(tool.buildResJson('增加标签成功',data));
    }).catch(function(err){
        next(err);
    })
});

exports.router = router;