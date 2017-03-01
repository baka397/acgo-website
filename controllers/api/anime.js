'use strict';
let express = require('express');
let router = express.Router();
let tool = require('../../common/tool');
let api = require('../../common/api');

const STATUS_CODE = require('../../enums/status_code');

exports.requestMapping = '/anime';

router.get('/', function(req, res, next){
    api.request(req.token,'anime',{
        keyword:req.query.keyword,
        page:req.query.page
    }).then(function(data){
        res.send(tool.buildResJson('获取数据成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.post('/add/', function(req, res, next){
    api.request(req.token,'anime',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('添加成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.post('/edit/', function(req, res, next){
    api.request(req.token,'animeEdit',req.body,'PUT').then(function(data){
        res.send(tool.buildResJson('修改成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.get('/detail/', function(req, res, next){
    api.request(req.token,'animeDetail',req.query).then(function(data){
        res.send(tool.buildResJson('获取详情成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.get('/sub/', function(req, res, next){
    api.request(req.token,'animeSubList').then(function(data){
        res.send(tool.buildResJson('查询订阅列表成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.post('/watch/add/', function(req, res, next){
    api.request(req.token,'animeWatch',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('更新观看历史成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.get('/watch/', function(req, res, next){
    api.request(req.token,'animeWatchHistory').then(function(data){
        res.send(tool.buildResJson('查询观看历史列表成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.get('/audit/', function(req, res, next){
    api.request(req.token,'animeAuditGet').then(function(data){
        res.send(tool.buildResJson('获取审核数据成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.post('/audit/', function(req, res, next){
    api.request(req.token,'animeAuditPost',req.body,'PUT').then(function(data){
        res.send(tool.buildResJson('审核成功',data));
    }).catch(function(err){
        next(err);
    });
});

router.post('/sub/', function(req, res, next){
    switch(parseInt(req.body.status)){
    case -1:
        return api.request(req.token,'animeSub',{
            id:req.body.id
        },'DELETE').then(function(data){
            res.send(tool.buildResJson('取消订阅成功',data));
        }).catch(function(err){
            next(err);
        });
    case 1:
        return api.request(req.token,'animeSub',{
            id:req.body.id
        },'PUT').then(function(data){
            res.send(tool.buildResJson('订阅成功',data));
        }).catch(function(err){
            next(err);
        });
    }
    let error=new Error('错误的订阅状态');
    error.status=STATUS_CODE.ERROR;
    next(error);
});
router.post('/group/add/', function(req, res, next){
    api.request(req.token,'animeGroup',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('添加剧集成功',data));
    }).catch(function(err){
        next(err);
    });
});
router.get('/group/', function(req, res, next){
    api.request(req.token,'animeGroup',req.query).then(function(data){
        res.send(tool.buildResJson('查询剧集成功',data));
    }).catch(function(err){
        next(err);
    });
});
router.get('/group/detail', function(req, res, next){
    api.request(req.token,'animeGroupDetail',req.query).then(function(data){
        res.send(tool.buildResJson('查询剧集成功',data));
    }).catch(function(err){
        next(err);
    });
});
router.post('/group/edit', function(req, res, next){
    api.request(req.token,'animeGroupDetail',req.body,'PUT').then(function(data){
        res.send(tool.buildResJson('修改剧集成功',data));
    }).catch(function(err){
        next(err);
    });
});
router.post('/item/add/', function(req, res, next){
    api.request(req.token,'animeGroupItem',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('添加剧集分集成功',data));
    }).catch(function(err){
        next(err);
    });
});
router.get('/item/', function(req, res, next){
    api.request(req.token,'animeGroupItem',req.query).then(function(data){
        res.send(tool.buildResJson('查询剧集分集成功',data));
    }).catch(function(err){
        next(err);
    });
});
router.get('/item/detail', function(req, res, next){
    api.request(req.token,'animeGroupItemDetail',req.query).then(function(data){
        res.send(tool.buildResJson('查询剧集分集成功',data));
    }).catch(function(err){
        next(err);
    });
});
router.post('/item/edit', function(req, res, next){
    api.request(req.token,'animeGroupItemDetail',req.body,'PUT').then(function(data){
        res.send(tool.buildResJson('修改剧集分集成功',data));
    }).catch(function(err){
        next(err);
    });
});
router.post('/task/add/', function(req, res, next){
    api.request(req.token,'animeGroupTask',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('添加剧集任务成功',data));
    }).catch(function(err){
        next(err);
    });
});
router.get('/task/detail', function(req, res, next){
    api.request(req.token,'animeGroupTaskGroupDetail',req.query).then(function(data){
        res.send(tool.buildResJson('查询剧集任务成功',data));
    }).catch(function(err){
        next(err);
    });
});
router.post('/task/edit', function(req, res, next){
    api.request(req.token,'animeGroupTaskDetail',req.body,'PUT').then(function(data){
        res.send(tool.buildResJson('修改剧集任务成功',data));
    }).catch(function(err){
        next(err);
    });
});

exports.router = router;