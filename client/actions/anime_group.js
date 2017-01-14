//加载依赖
import {goBack} from 'react-router-redux'; //router跳转方法
import {fetch} from '../common/api';
import {modalUpdate,modalClean} from './modal';

export const UPDATE_ANIME_GROUP = 'UPDATE_ANIME_GROUP';
export const CLEAN_ANIME_GROUP = 'CLEAN_ANIME_GROUP';
export const UPDATE_ANIME_GROUP_DETAIL = 'UPDATE_ANIME_GROUP_DETAIL';

export function getAnimeGroupList(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeGroupList',data).then((res)=>{
            dispatch(updateAnimeGroup(res.data));
            dispatch(modalClean('loading'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}

export function addAnimeGroup(data){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeGroupAdd',data,'POST').then((res)=>{
            dispatch(modalUpdate({
                tip:res.msg,
                loading:null
            }));
            dispatch(goBack());
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}

/**
 * 更新动画剧集数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateAnimeGroup(data){
    return {
        type: UPDATE_ANIME_GROUP,
        data: data
    }
}
/**
 * 更新动画剧集详情数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateAnimeGroupDetail(data){
    return {
        type: UPDATE_ANIME_GROUP_DETAIL,
        data: data
    }
}

/**
 * 清除动画剧集数据
 * @return {Object} action数据
 */
export function cleanAnimeGroup(){
    return {
        type: CLEAN_ANIME_GROUP
    }
}