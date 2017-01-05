//加载依赖
import {push} from 'react-router-redux'; //router跳转方法
import md5 from 'md5';
import {fetch} from '../common/api';
import {modalUpdate,modalClean} from './modal';
import {clientPath} from '../config';

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
        fetch('register',sendData,'POST').then((data)=>{
            dispatch(modalUpdate({
                tip:data.msg,
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
        fetch('login',sendData,'POST').then((data)=>{
            return fetch('me');
        }).then((data)=>{
            dispatch(updateUser(data.data));
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
 * 用户登出
 * @return {function} thunk函数
 */
export function userLogout(){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('logout',null,'POST').then((data)=>{
            dispatch(cleanUser());
            dispatch(modalClean('loading'));
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