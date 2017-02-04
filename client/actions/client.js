//加载依赖
import {modalUpdate,modalClean} from './modal';
import {getCacheSize,clearCacheSize,getCacheDir,setCacheDir} from '../common/ipc';

export const UPDATE_CLIENT_CACHE = 'UPDATE_CLIENT_CACHE';
export const CLEAN_CLIENT_CACHE = 'CLEAN_CLIENT_CACHE';
export const CLEAN_CLIENT = 'CLEAN_CLIENT';
export const UPDATE_CLIENT_CACHE_DIR = 'UPDATE_CLIENT_CACHE_DIR';

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

export function getClientCacheDir(){
    return function(dispatch){
        dispatch(modalUpdate({
            loading:true
        }));
        getCacheDir();
    }
}

export function getClientCacheDirSuccess(filePath){
    return function(dispatch){
        dispatch(updateClientCacheDir(filePath));
        dispatch(modalClean('loading'));
    }
}

export function setClientCacheDir(){
    return function(dispatch){
        setCacheDir();
    }
}

export function setClientCacheDirSuccess(filePath){
    return function(dispatch){
        if(filePath){
            dispatch(modalUpdate({
                tip:'设置缓存目录('+filePath+')成功,重新打开客户端生效'
            }));
        }
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
 * 更新客户端缓存目录
 * @param  {Object} dir 缓存目录
 * @return {Object}     action数据
 */
export function updateClientCacheDir(dir){
    return {
        type: UPDATE_CLIENT_CACHE_DIR,
        dir: dir
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