//加载依赖
import {push} from 'react-router-redux'; //router跳转方法
import md5 from 'md5';
import {fetch} from '../common/api';
import {modalUpdate,modalClean} from './modal';
import {clientPath} from '../config';

export const UPDATE_ANIME = 'UPDATE_ANIME';
export const CLEAN_ANIME = 'CLEAN_ANIME';

/**
 * 动画搜索
 * @param  {Object} data 搜索数据
 * @return {function}    thunk函数
 */
export function search(data){
    return function(dispatch){
        if(!data.keyword) return dispatch(cleanAnime());
        let sendData = {
            keyword:data.keyword,
            page:data.page
        }
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeSearch',sendData).then((data)=>{
            dispatch(updateUser(data.data));
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
 * 更新用户数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateUser(data){
    return {
        type: UPDATE_ANIME,
        data: data
    }
}

/**
 * 清除用户数据
 * @return {Object} action数据
 */
export function cleanAnime(){
    return {
        type: CLEAN_ANIME
    }
}