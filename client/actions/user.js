//加载依赖
import {push} from 'react-router-redux'; //router跳转方法
import md5 from 'md5';
import {fetchUrls,fetch} from '../common/api';
import {modalUpdate} from './modal';

/**
 * 用户注册
 * @param  {Object} data 注册数据
 * @return {function}    thunk函数
 */
export function userReg(data){
    return function(dispatch){
        let sendData = {
            email:data.email,
            code:data.code,
            password:md5(data.password).toUpperCase()
        }
        fetch(fetchUrls.register,sendData,'POST').then((data)=>{
            console.log(data);
        })
    }
}