//加载依赖
import {goBack} from 'react-router-redux'; //router跳转方法
import {fetch} from '../common/api';
import {modalUpdate,modalClean} from './modal';

export const UPDATE_ANIME = 'UPDATE_ANIME';
export const CLEAN_ANIME = 'CLEAN_ANIME';
export const UPDATE_ANIME_DETAIL = 'UPDATE_ANIME_DETAIL';

export function search(data){
    return function(dispatch){
        if(!data.keyword) return dispatch(cleanAnime());
        let sendData = {
            keyword:data.keyword,
            page:data.page
        };
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeSearch',sendData).then((res)=>{
            dispatch(updateAnime(res.data));
            dispatch(modalClean('loading'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }));
        });
    };
}

export function getAnimeDetail(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeDetail',data).then((res)=>{
            dispatch(updateAnimeDetail(res.data));
            dispatch(modalClean('loading'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }));
        });
    };
}

export function editAnime(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeEdit',data,'POST').then((res)=>{
            dispatch(modalUpdate({
                tip:res.msg,
                loading:null
            }));
            dispatch(goBack());
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }));
        });
    };
}

export function addAnime(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeAdd',data,'POST').then((res)=>{
            dispatch(modalUpdate({
                tip:res.msg,
                loading:null
            }));
            dispatch(goBack());
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }));
        });
    };
}

/**
 * 更新动画数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateAnime(data){
    return {
        type: UPDATE_ANIME,
        data: data
    };
}
/**
 * 更新动画详情数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateAnimeDetail(data){
    return {
        type: UPDATE_ANIME_DETAIL,
        data: data
    };
}

/**
 * 清除动画数据
 * @return {Object} action数据
 */
export function cleanAnime(){
    return {
        type: CLEAN_ANIME
    };
}