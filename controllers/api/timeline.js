'use strict';
let express = require('express');
let router = express.Router();
let tool = require('../../common/tool');
let api = require('../../common/api');

exports.requestMapping = '/timeline';

router.get('/', function(req, res, next){
    api.request(req.token,'timelineAll',{
        page:req.query.page
    }).then(function(data){
        res.send(tool.buildResJson('获取订阅列表成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.get('/:id', function(req, res, next){
    req.params.page=req.query.page;
    api.request(req.token,'timeline',req.params).then(function(data){
        res.send(tool.buildResJson('获取用户订阅列表成功',data));
    }).catch(function(err){
        next(err);
    });
});

exports.router = router;