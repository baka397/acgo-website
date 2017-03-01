'use strict';
let express = require('express');
let router = express.Router();
let tool = require('../../common/tool');
let api = require('../../common/api');

exports.requestMapping = '/user';

router.post('/register', function(req, res, next){
    let sendData={
        email:req.body.email,
        code:req.body.code,
        nickname:req.body.nickname,
        password:req.body.password
    };
    api.request(req.token,'register',sendData,'POST').then(function(){
        res.send(tool.buildResJson('注册成功',null));
    }).catch(function(err){
        next(err);
    });
});

router.post('/login', function(req, res, next){
    let sendData={
        email:req.body.email,
        password:req.body.password
    };
    api.request(req.token,'login',sendData,'POST').then(function(data){
        tool.setToken(res,data.key);
        res.send(tool.buildResJson('登录成功',null));
    }).catch(function(err){
        next(err);
    });
});

router.post('/changePassword', function(req, res, next){
    req.body.id='me';
    api.request(req.token,'userInfo',req.body,'PUT').then(function(){
        res.send(tool.buildResJson('重置密码成功,请重新登录',null));
    }).catch(function(err){
        next(err);
    });
});

router.post('/profile', function(req, res, next){
    req.body.id='me';
    api.request(req.token,'userInfo',req.body,'PUT').then(function(){
        res.send(tool.buildResJson('更新资料成功',null));
    }).catch(function(err){
        next(err);
    });
});

router.get('/:id', function(req, res, next){
    api.request(req.token,'userInfo',req.params).then(function(data){
        res.send(tool.buildResJson('获取个人数据成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.post('/logout', function(req, res, next){
    api.request(req.token,'userInfo',{
        id:'me'
    },'DELETE').then(function(data){
        res.clearCookie(global.CONFIG.tokenName);
        res.send(tool.buildResJson('登出成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.post('/sendPwdMail', function(req, res, next){
    api.request(req.token,'sendPwdMail',{
        email:req.body.email,
        backurl:global.CONFIG.clientPath+'/common/resetpwd'
    },'POST').then(function(data){
        res.send(tool.buildResJson('发送邮件成功,请注意查收邮件!如果长时间没有收到邮件,请查看垃圾邮箱或联系管理员解决.',data));
    }).catch(function(err){
        next(err);
    });
});

router.post('/resetPwd', function(req, res, next){
    api.request(req.token,'resetPwd',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('重置密码成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.get('/follow/relation/:id', function(req, res, next){
    api.request(req.token,'userFansRelation',req.params).then(function(data){
        res.send(tool.buildResJson('获取关注关系成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.post('/follow/', function(req, res, next){
    api.request(req.token,'userFollow',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('关注成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.delete('/follow/:id', function(req, res, next){
    api.request(req.token,'userFollowDetail',req.params,'DELETE').then(function(data){
        res.send(tool.buildResJson('取消关注成功',data));
    }).catch(function(err){
        next(err);
    });
});

exports.router = router;