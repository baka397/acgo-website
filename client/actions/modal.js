//登入请求
export const MODAL_UPDATE = 'MODAL_UPDATE';
export const MODAL_CLEAN = 'MODAL_CLEAN';
/*
 * action 创建函数
 */
export function modalUpdate(data){
    return {
        type:MODAL_UPDATE,
        data
    }
}
export function modalClean(modalKey){
    return {
        type:MODAL_CLEAN,
        key:modalKey
    }
}