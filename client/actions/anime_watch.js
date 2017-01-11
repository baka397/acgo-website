//加载依赖
import {goBack} from 'react-router-redux'; //router跳转方法
import {fetch} from '../common/api';
import {modalUpdate,modalClean} from './modal';

export const UPDATE_ANIME_WATCH = 'UPDATE_ANIME_WATCH';
export const CLEAN_ANIME_WATCH = 'CLEAN_ANIME_WATCH';

export function getAnimeWatchList(){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeWatchList').then((res)=>{
            dispatch(cleanAnimeWatch());
            dispatch(updateAnimeWatch(res.data));
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
 * 获取动画观看数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateAnimeWatch(data){
    return {
        type: UPDATE_ANIME_WATCH,
        data: data
    }
}

/**
 * 清除动画观看数据
 * @return {Object} action数据
 */
export function cleanAnimeWatch(){
    return {
        type: CLEAN_ANIME_WATCH
    }
}