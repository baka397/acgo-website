//导入action常量
import { MODAL_UPDATE,MODAL_CLEAN } from '../actions/modal';

//初始化state
const INIT_STATE = {
    'loading':null, //是否加载
    'tip':null //提示信息
}

export default function modal(state = INIT_STATE, action) {
    switch (action.type) {
        case MODAL_UPDATE:
            return Object.assign({}, state, action.data);
            break;
        case MODAL_CLEAN:
            if(action.key){
                let modalResult=Object.assign({}, state);
                if(Array.isArray(action.key)){
                    action.key.forEach((key)=>{
                        modalResult[key]=null;
                    })
                }
                else modalResult[action.key]=null;
                return modalResult;
            }
            else return Object.assign({}, INIT_STATE);
            break;
        default:
            return state;
    }
}