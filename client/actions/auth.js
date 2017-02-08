//加载依赖
import {replace} from 'react-router-redux'; //router跳转方法
import {isObjEmpty} from '../common/tool';
import {clientPath} from '../config';

import {getAnimeSubList} from './anime_sub';
import {getAnimeWatchList} from './anime_watch';

/**
 * 验证登录状态
 * @param  {Object} user          用户对象
 * @param  {Boolen} isLogin       检测状态
 * @param  {Boolen} switchStatus  是否为分发方法
 * @return {function}             thunk函数
 */
export function authLoginStatus(user,isLogin,switchStatus=false){
    return function(dispatch){
        if(switchStatus){
            if(isObjEmpty(user)){
                dispatch(replace(clientPath+'/common/'));
            }else{
                dispatch(replace(clientPath+'/dashboard/'));
            }
        }else{
            //检测登录
            if(isLogin){
                if(isObjEmpty(user)){
                    dispatch(replace(clientPath+'/common/'));
                }else{
                    //加载订阅和观看历史列表
                    dispatch(getAnimeSubList());
                    dispatch(getAnimeWatchList());
                }
            }else{ //检测未登录
                if(!isObjEmpty(user)){
                    dispatch(replace(clientPath+'/dashboard/'));
                }
            }
        }
    };
}