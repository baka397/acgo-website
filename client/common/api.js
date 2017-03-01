import fetch from 'isomorphic-fetch';
import {apiPath,uploadPath} from '../config';
import {nextPromise,serialize,isObjEmpty} from './tool';
const URLS={
    register:apiPath+'/user/register', //用户注册
    login:apiPath+'/user/login', //用户登录
    changePassword:apiPath+'/user/changePassword', //用户重置密码
    sendPwdMail:apiPath+'/user/sendPwdMail', //用户发送重置密码邮件
    resetPwd:apiPath+'/user/resetPwd', //用户重置密码
    profile:apiPath+'/user/profile', //用户资料
    logout:apiPath+'/user/logout', //用户登出
    me:apiPath+'/user/me', //用户自有信息
    userProfile: apiPath +'/user/:id', //用户数据
    userFollowRelation:apiPath+'/user/follow/relation/:id', //用户关注关系
    userFollowAdd: apiPath + '/user/follow/', //添加用户关注
    userFollowDelete: apiPath + '/user/follow/:id', //取消用户关注
    animeSearch:apiPath+'/anime/', //动画搜索
    animeDetail:apiPath+'/anime/detail/', //动画详情
    animeAdd:apiPath+'/anime/add/', //动画添加
    animeEdit:apiPath+'/anime/edit/', //动画编辑
    animeSub:apiPath+'/anime/sub/', //动画订阅
    animeSubList:apiPath+'/anime/sub/', //动画订阅数据
    animeWatchAdd:apiPath+'/anime/watch/add/', //动画观看数据添加
    animeWatchList:apiPath+'/anime/watch/', //动画观看数据
    animeAudit:apiPath+'/anime/audit/', //动画审核数据
    animeGroupAdd:apiPath+'/anime/group/add/', //动画剧集增加
    animeGroupEdit:apiPath+'/anime/group/edit/', //动画剧集修改
    animeGroupList:apiPath+'/anime/group/', //动画剧集列表
    animeGroupDetail:apiPath+'/anime/group/detail', //动画剧集列表
    animeItemAdd:apiPath+'/anime/item/add/', //动画剧集分集增加
    animeItemEdit:apiPath+'/anime/item/edit/', //动画剧集分集修改
    animeItemList:apiPath+'/anime/item/', //动画剧集分集列表
    animeItemDetail:apiPath+'/anime/item/detail', //动画剧集分集列表
    animeTaskAdd:apiPath+'/anime/task/add/', //动画剧集任务增加
    animeTaskEdit:apiPath+'/anime/task/edit/', //动画剧集任务修改
    animeTaskDetail:apiPath+'/anime/task/detail', //动画剧集任务列表
    uploadToken:apiPath+'/uploadToken/', //获取上传token
    tag:apiPath+'/tag/', //获取标签
    tagAdd:apiPath+'/tag/add', //增加标签
    analyticsDimension:apiPath+'/analytics/dimension/:id', //获取统计数据
    upload:uploadPath+'/' //上传文件地址
};
let customHeader={
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8'
};
/**
 * Fetch请求
 * @param  {String} path   请求路径
 * @param  {Object} data   请求参数
 * @param  {String} method 请求类型
 * @return {Object}        Promise对象
 */
function fetchPost(action,data,method){
    let path = URLS[action];
    if(!path) return nextPromise(new Error('无效的API地址'));
    let idReg=/\:id/;
    if(idReg.test(path)){
        path=path.replace(idReg,data.id);
        delete data.id;
    }
    let option={
        method:method?method.toLowerCase():'get'
    };
    switch(method){
    case 'file':
        option.mode='cors';
        break;
    default:
        option.credentials='include';
        option.headers=customHeader;
    }
    if(!isObjEmpty(data)){
        switch(option.method){
        case 'file':
            option.method='post';
            option.body=data;
            break;
        case 'get':
            path+=(/\?/.test(path) ? '&' : '?')+serialize(data);
            break;
        default:
            option.body=JSON.stringify(data);
        }
    }
    return fetch(path,option).then(response => response.json()).then(function(data){
        if(method==='file'){
            return nextPromise(null,data.key);
        }else{
            if(data.code!==200) return nextPromise(new Error(data.msg));
            return nextPromise(null,data);
        }
    });
}
exports.fetch=fetchPost;