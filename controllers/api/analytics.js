'use strict';
let express = require('express');
let router = express.Router();
let tool = require('../../common/tool');
let api = require('../../common/api');
exports.requestMapping = '/analytics';

router.get('/dimension/:id', function(req, res, next){
    api.request(req.token,'analyticsDimension',req.params).then(function(data){
        res.send(tool.buildResJson('获取分析数据成功',data));
    }).catch(function(err){
        next(err);
    });
});

exports.router = router;