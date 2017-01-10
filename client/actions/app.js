export const UPDATE_APP = 'UPDATE_APP';
export const CLEAN_APP = 'CLEAN_APP';

/**
 * 更新APP数据
 * @param  {Object} data 用户数据
 * @return {Object}      action数据
 */
export function updateApp(data){
    return {
        type: UPDATE_APP,
        data: data
    }
}

/**
 * 清除APP数据
 * @return {Object} action数据
 */
export function cleanApp(){
    return {
        type: CLEAN_APP
    }
}