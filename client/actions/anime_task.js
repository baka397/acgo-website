//加载依赖
import {goBack} from 'react-router-redux'; //router跳转方法
import {fetch} from '../common/api';
import {modalUpdate,modalClean} from './modal';

export const CLEAN_ANIME_TASK = 'CLEAN_ANIME_TASK';
export const UPDATE_ANIME_TASK_DETAIL = 'UPDATE_ANIME_TASK_DETAIL';

export function getAnimeTaskDetail(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeTaskDetail',data).then((res)=>{
            dispatch(updateAnimeTaskDetail(res.data));
            dispatch(modalClean('loading'));
        }).catch((err)=>{
            dispatch(updateAnimeTaskDetail());
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }));
        });
    };
}

export function editAnimeTask(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeTaskEdit',data,'POST').then((res)=>{
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

export function addAnimeTask(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeTaskAdd',data,'POST').then((res)=>{
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
 * 更新动画剧集详情数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateAnimeTaskDetail(data){
    return {
        type: UPDATE_ANIME_TASK_DETAIL,
        data: data
    };
}

/**
 * 清除动画剧集数据
 * @return {Object} action数据
 */
export function cleanAnimeTask(){
    return {
        type: CLEAN_ANIME_TASK
    };
}