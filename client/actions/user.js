//加载依赖
import {fetch} from '../common/api';

import {modalUpdate,modalClean} from './modal';

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const UPDATE_USER_RELATION = 'UPDATE_USER_RELATION';
export const CLEAN_USER = 'CLEAN_USER';

/**
 * 获取用户资料
 * @param  {String}   id 用户ID
 * @return {Function}    Thunk函数
 */
export function getUserProfile(id){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('userProfile',{
            id
        }).then((res)=>{
            dispatch(updateUserProfile(res.data));
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
 * 获取用户关注关系
 * @param  {String}   userId   用户ID
 * @param  {String}   friendId 好友ID
 * @return {Function}          Thunk函数
 */
export function getUserRelation(userId,friendId){
    return function(dispatch){
        let relationData={
            id:'',
            status:-2
        };
        if(userId===friendId){
            return dispatch(updateUserRelation(relationData));
        }
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('userFollowRelation',{
            id:friendId
        }).then((res)=>{
            dispatch(modalClean('loading'));
            let followStatus,followedStatus;
            res.data.forEach(function(relation){
                if(relation.create_user===userId){
                    relationData.id=relation._id;
                    relationData.status=relation.status;
                    followStatus=relation.status;
                }else{
                    followedStatus=relation.status;
                }
            });
            //查询是否关注
            if(followStatus>0){
                return dispatch(updateUserRelation(relationData));
            }
            //查询是否被关注
            if(followedStatus>0){
                relationData.id='';
                relationData.status=-1;
                return dispatch(updateUserRelation(relationData));
            }
            //设为默认状态
            relationData.id='';
            relationData.status=0;
            return dispatch(updateUserRelation(relationData));
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }));
        });
    };
}

/**
 * 关注用户
 * @param  {String}   userId       用户ID
 * @param  {String}   followUserId 关注用户ID
 * @return {Function}              Thunk函数
 */
export function followUser(userId,followUserId){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('userFollowAdd',{
            followUser:followUserId
        },'POST').then(()=>{
            dispatch(getUserRelation(userId,followUserId));
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
 * 取消关注用户
 * @param  {String}   userId       用户ID
 * @param  {String}   followUserId 关注用户ID
 * @return {Function}              Thunk函数
 */
export function unfollowUser(userId,followUserId,followId){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('userFollowDelete',{
            id:followId
        },'DELETE').then(()=>{
            dispatch(getUserRelation(userId,followUserId));
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
 * 更新用户数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateUserProfile(data){
    return {
        type: UPDATE_USER_PROFILE,
        data
    };
}

/**
 * 更新用户关系数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateUserRelation(data){
    return {
        type: UPDATE_USER_RELATION,
        data
    };
}

/**
 * 清除用户数据
 * @return {Object} action数据
 */
export function cleanUser(){
    return {
        type: CLEAN_USER
    };
}