//加载依赖
import {goBack} from 'react-router-redux'; //router跳转方法
import {fetch} from '../common/api';
import {modalUpdate,modalClean} from './modal';

export const UPDATE_ANIME_SUB = 'UPDATE_ANIME_SUB';
export const CLEAN_ANIME_SUB = 'CLEAN_ANIME_SUB';

export function subAnime(animeId,status){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeSub',{
            id:animeId,
            status
        },'POST').then((res)=>{
            dispatch(getAnimeSubList());
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}

export function getAnimeSubList(){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeSubList').then((res)=>{
            dispatch(cleanAnimeSub());
            dispatch(updateAnimeSub(res.data));
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
 * 获取动画订阅数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateAnimeSub(data){
    return {
        type: UPDATE_ANIME_SUB,
        data: data
    }
}

/**
 * 清除动画订阅数据
 * @return {Object} action数据
 */
export function cleanAnimeSub(){
    return {
        type: CLEAN_ANIME_SUB
    }
}