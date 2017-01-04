//加载依赖
import {replace} from 'react-router-redux'; //router跳转方法
import {isObjEmpty} from '../common/tool';

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
                dispatch(replace('/client/common/'));
            }else{
                dispatch(replace('/client/dashboard/'));
            }
        }else{
            //检测登录
            if(isLogin){
                if(isObjEmpty(user)){
                    dispatch(replace('/client/common/'));
                }
            }else{ //检测未登录
                if(!isObjEmpty(user)){
                    dispatch(replace('/client/dashboard/'));
                }
            }
        }
    }
}