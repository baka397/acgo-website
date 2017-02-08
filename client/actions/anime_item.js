//加载依赖
import {goBack} from 'react-router-redux'; //router跳转方法
import {fetch} from '../common/api';
import {modalUpdate,modalClean} from './modal';

export const UPDATE_ANIME_ITEM = 'UPDATE_ANIME_ITEM';
export const CLEAN_ANIME_ITEM = 'CLEAN_ANIME_ITEM';
export const UPDATE_ANIME_ITEM_DETAIL = 'UPDATE_ANIME_ITEM_DETAIL';

export function getAnimeItemDetail(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeItemDetail',data).then((res)=>{
            dispatch(updateAnimeItemDetail(res.data));
            dispatch(modalClean('loading'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }));
        });
    };
}

export function getAnimeItemList(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeItemList',data).then((res)=>{
            dispatch(updateAnimeItem(res.data));
            dispatch(modalClean('loading'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }));
        });
    };
}

export function editAnimeItem(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeItemEdit',data,'POST').then((res)=>{
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

export function addAnimeItem(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeItemAdd',data,'POST').then((res)=>{
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
 * 更新动画剧集数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateAnimeItem(data){
    return {
        type: UPDATE_ANIME_ITEM,
        data: data
    };
}
/**
 * 更新动画剧集详情数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateAnimeItemDetail(data){
    return {
        type: UPDATE_ANIME_ITEM_DETAIL,
        data: data
    };
}

/**
 * 清除动画剧集数据
 * @return {Object} action数据
 */
export function cleanAnimeItem(){
    return {
        type: CLEAN_ANIME_ITEM
    };
}