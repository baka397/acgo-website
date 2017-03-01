'use strict';
let express = require('express');
let router = express.Router();
let tool = require('../../common/tool');
let api = require('../../common/api');

exports.requestMapping = '/tag';

router.get('/', function(req, res, next){
    api.request(req.token,'tag',{
        type:req.query.type,
        keyword:req.query.keyword,
        ids:req.query.ids
    }).then(function(data){
        res.send(tool.buildResJson('获取标签成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.post('/add', function(req, res, next){
    api.request(req.token,'tag',{
        name:req.body.name,
        type:req.body.type
    },'POST').then(function(data){
        res.send(tool.buildResJson('增加标签成功',data));
    }).catch(function(err){
        next(err);
    });
});

exports.router = router;