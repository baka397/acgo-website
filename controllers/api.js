'use strict';
let express = require('express');
let router = express.Router();
let tool = require('../common/tool');
let api = require('../common/api');
let auth = require('../middlewares/auth');
const STATUS_CODE = require('../enums/status_code');

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

router.post('/anime/edit/', function(req, res, next){
    api.request(req.token,'animeEdit',req.body,'PUT').then(function(data){
        res.send(tool.buildResJson('修改成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.get('/anime/detail/', function(req, res, next){
    api.request(req.token,'animeDetail',req.query).then(function(data){
        res.send(tool.buildResJson('获取详情成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.get('/anime/sub/', function(req, res, next){
    api.request(req.token,'animeSubList').then(function(data){
        res.send(tool.buildResJson('查询订阅列表成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.post('/anime/watch/add/', function(req, res, next){
    api.request(req.token,'animeWatch',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('更新观看历史成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.get('/anime/watch/', function(req, res, next){
    api.request(req.token,'animeWatch').then(function(data){
        res.send(tool.buildResJson('查询观看历史列表成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.get('/anime/audit/', function(req, res, next){
    api.request(req.token,'animeAuditGet').then(function(data){
        res.send(tool.buildResJson('获取审核数据成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.post('/anime/audit/', function(req, res, next){
    api.request(req.token,'animeAuditPost',req.body,'PUT').then(function(data){
        res.send(tool.buildResJson('审核成功',data));
    }).catch(function(err){
        next(err);
    })
});

router.post('/anime/sub/', function(req, res, next){
    switch(parseInt(req.body.status)){
        case -1:
            api.request(req.token,'animeSub',{
                id:req.body.id
            },'DELETE').then(function(data){
                res.send(tool.buildResJson('取消订阅成功',data));
            }).catch(function(err){
                next(err);
            })
            break;
        case 1:
            api.request(req.token,'animeSub',{
                id:req.body.id
            },'PUT').then(function(data){
                res.send(tool.buildResJson('订阅成功',data));
            }).catch(function(err){
                next(err);
            })
            break;
        default:
            let error=new Error('错误的订阅状态');
            error.status=STATUS_CODE.ERROR;
            next(error);
    }
});
router.post('/anime/group/add/', function(req, res, next){
    api.request(req.token,'animeGroup',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('添加剧集成功',data));
    }).catch(function(err){
        next(err);
    })
})
router.get('/anime/group/', function(req, res, next){
    api.request(req.token,'animeGroup',req.query).then(function(data){
        res.send(tool.buildResJson('查询剧集成功',data));
    }).catch(function(err){
        next(err);
    })
})
router.get('/anime/group/detail', function(req, res, next){
    api.request(req.token,'animeGroupDetail',req.query).then(function(data){
        res.send(tool.buildResJson('查询剧集成功',data));
    }).catch(function(err){
        next(err);
    })
})
router.post('/anime/group/edit', function(req, res, next){
    api.request(req.token,'animeGroupDetail',req.body,'PUT').then(function(data){
        res.send(tool.buildResJson('修改剧集成功',data));
    }).catch(function(err){
        next(err);
    })
})
router.post('/anime/item/add/', function(req, res, next){
    api.request(req.token,'animeGroupItem',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('添加剧集分集成功',data));
    }).catch(function(err){
        next(err);
    })
})
router.get('/anime/item/', function(req, res, next){
    api.request(req.token,'animeGroupItem',req.query).then(function(data){
        res.send(tool.buildResJson('查询剧集分集成功',data));
    }).catch(function(err){
        next(err);
    })
})
router.get('/anime/item/detail', function(req, res, next){
    api.request(req.token,'animeGroupItemDetail',req.query).then(function(data){
        res.send(tool.buildResJson('查询剧集分集成功',data));
    }).catch(function(err){
        next(err);
    })
})
router.post('/anime/item/edit', function(req, res, next){
    api.request(req.token,'animeGroupItemDetail',req.body,'PUT').then(function(data){
        res.send(tool.buildResJson('修改剧集分集成功',data));
    }).catch(function(err){
        next(err);
    })
})
router.post('/anime/task/add/', function(req, res, next){
    api.request(req.token,'animeGroupTask',req.body,'POST').then(function(data){
        res.send(tool.buildResJson('添加剧集任务成功',data));
    }).catch(function(err){
        next(err);
    })
})
router.get('/anime/task/detail', function(req, res, next){
    api.request(req.token,'animeGroupTaskGroupDetail',req.query).then(function(data){
        res.send(tool.buildResJson('查询剧集任务成功',data));
    }).catch(function(err){
        next(err);
    })
})
router.post('/anime/task/edit', function(req, res, next){
    api.request(req.token,'animeGroupTaskDetail',req.body,'PUT').then(function(data){
        res.send(tool.buildResJson('修改剧集任务成功',data));
    }).catch(function(err){
        next(err);
    })
})

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