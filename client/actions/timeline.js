//加载依赖
import {fetch} from '../common/api';

import {modalUpdate,modalClean} from './modal';

export const UPDATE_TIMELINE = 'UPDATE_TIMELINE';
export const CLEAN_TIMELINE = 'CLEAN_TIMELINE';

export function getTimelineAll(page){
    return function(dispatch){
        let sendData = {
            page:page
        };
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('timelineAll',sendData).then((res)=>{
            dispatch(updateTimeline(res.data));
            dispatch(modalClean('loading'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }));
        });
    };
}

export function getTimelineById(id,page){
    return function(dispatch){
        let sendData = {
            id:id,
            page:page
        };
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('timeline',sendData).then((res)=>{
            dispatch(updateTimeline(res.data));
            dispatch(modalClean('loading'));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }));
        });
    };
}

/**
 * 更新时间轴数据
 * @param  {Object} data 时间轴数据
 * @return {Object}      action数据
 */
export function updateTimeline(data){
    return {
        type: UPDATE_TIMELINE,
        data
    };
}

/**
 * 清除时间轴数据
 * @return {Object} action数据
 */
export function cleanTimeline(){
    return {
        type: CLEAN_TIMELINE
    };
}