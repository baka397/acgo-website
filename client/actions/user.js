//加载依赖
import {push} from 'react-router-redux'; //router跳转方法
import md5 from 'md5';
import {fetch} from '../common/api';
import {clientPath} from '../config';

import {modalUpdate,modalClean} from './modal';
import {cleanAnimeSub} from './anime_sub';
import {cleanAnimeWatch} from './anime_watch';

export const UPDATE_USER = 'UPDATE_USER';
export const CLEAN_USER = 'CLEAN_USER';

/**
 * 用户注册
 * @param  {Object} data 注册数据
 * @return {function}    thunk函数
 */
export function userReg(data){
    return function(dispatch){
        let sendData = {
            email:data.email,
            code:data.code,
            nickname:data.nickname,
            password:md5(data.password).toUpperCase()
        }
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('register',sendData,'POST').then((res)=>{
            dispatch(modalUpdate({
                tip:res.msg,
                loading:null
            }))
            dispatch(push(clientPath+'/common/'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}

/**
 * 用户登录
 * @param  {Object} data 注册数据
 * @return {function}    thunk函数
 */
export function userLogin(data){
    return function(dispatch){
        let sendData = {
            email:data.email,
            password:md5(data.password).toUpperCase()
        }
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('login',sendData,'POST').then((res)=>{
            return fetch('me');
        }).then((res)=>{
            dispatch(updateUser(res.data));
            dispatch(modalClean('loading'));
            dispatch(push(clientPath+'/dashboard/'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}

/**
 * 发送找回密码邮件
 * @param  {Object} data 注册数据
 * @return {function}    thunk函数
 */
export function userSendMail(data){ 
    return function(dispatch){
        let sendData = {
            email:data.email
        }
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('sendPwdMail',sendData,'POST').then((res)=>{
            dispatch(modalUpdate({
                tip:res.msg,
                loading:null
            }))
            dispatch(push(clientPath+'/common/'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}

/**
 * 重置密码
 * @param  {Object} data 注册数据
 * @return {function}    thunk函数
 */
export function userResetPwd(data){ 
    return function(dispatch){
        let sendData = {
            password:md5(data.password).toUpperCase(),
            resetToken:data.token
        }
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('resetPwd',sendData,'POST').then((res)=>{
            dispatch(modalUpdate({
                tip:res.msg,
                loading:null
            }))
            dispatch(push(clientPath+'/common/'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}

/**
 * 清除用户数据
 * @param  {Function} dispatch 分发器
 */
function clearUserInfo(dispatch){
    //清除登录数据
    dispatch(cleanUser());
    //清除订阅数据
    dispatch(cleanAnimeSub());
    dispatch(cleanAnimeWatch());
    dispatch(modalClean('loading'));
    dispatch(push(clientPath+'/common/'));
}

/**
 * 用户登出
 * @return {function} thunk函数
 */
export function userLogout(){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('logout',null,'POST').then((res)=>{
            clearUserInfo(dispatch);
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}

/**
 * 用户修改密码
 * @return {function} thunk函数
 */
export function userChangePassword(data){
    let sendData = {
        oldPassword:md5(data.oldPassword).toUpperCase(),
        password:md5(data.password).toUpperCase()
    }
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('changePassword',sendData,'POST').then((res)=>{
            dispatch(modalUpdate({
                tip:res.msg
            }))
            clearUserInfo(dispatch);
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}

export function userGet(){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('me').then((res)=>{
            dispatch(updateUser(res.data));
            dispatch(modalClean('loading'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}

/**
 * 用户修改资料
 * @return {function} thunk函数
 */
export function userChangeProfile(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('profile',data,'POST').then((res)=>{
            dispatch(modalUpdate({
                tip:res.msg
            }))
            dispatch(userGet());
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}

/**
 * 更新用户数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateUser(data){
    return {
        type: UPDATE_USER,
        data: data
    }
}

/**
 * 清除用户数据
 * @return {Object} action数据
 */
export function cleanUser(){
    return {
        type: CLEAN_USER
    }
}