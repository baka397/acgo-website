//加载依赖
import {modalUpdate,modalClean} from './modal';
import {getCacheSize,clearCacheSize} from '../common/ipc';

export const UPDATE_CLIENT_CACHE = 'UPDATE_CLIENT_CACHE';
export const CLEAN_CLIENT_CACHE = 'CLEAN_CLIENT_CACHE';
export const CLEAN_CLIENT = 'CLEAN_CLIENT';

export function getClientCache(){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        getCacheSize();
    }
}

export function getClientCacheSuccess(size){
    return function(dispatch){
        dispatch(updateClientCache(size));
        dispatch(modalClean('loading'));
    }
}

export function clearClientCache(){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        clearCacheSize();
    }
}

export function clearClientCacheSuccess(){
    return function(dispatch){
        dispatch(cleanClientCache());
        dispatch(modalClean('loading'));
    }
}

/**
 * 更新客户端缓存数据
 * @param  {Object} size 缓存数据
 * @return {Object}      action数据
 */
export function updateClientCache(size){
    return {
        type: UPDATE_CLIENT_CACHE,
        size: size
    }
}

/**
 * 清除客户端缓存数据
 * @return {Object} action数据
 */
export function cleanClientCache(){
    return {
        type: CLEAN_CLIENT_CACHE
    }
}

/**
 * 清除客户端数据
 * @return {Object} action数据
 */
export function cleanClient(){
    return {
        type: CLEAN_CLIENT
    }
}