'use strict';
let express = require('express');
let router = express.Router();
let tool = require('../../common/tool');
let api = require('../../common/api');

exports.requestMapping = '';

router.get('/uploadToken', function(req, res, next){
    api.request(req.token,'uploadToken').then(function(data){
        res.send(tool.buildResJson('获取token成功',data));
    }).catch(function(err){
        next(err);
    });
});

exports.router = router;