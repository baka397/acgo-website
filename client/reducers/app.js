//导入action常量
import {UPDATE_APP,CLEAN_APP} from '../actions/app';

//初始化state
const INIT_STATE = {};

export default function app(state = INIT_STATE, action) {
    switch (action.type) {
    case UPDATE_APP:
        return Object.assign({}, state, action.data);
    case CLEAN_APP:
        return Object.assign({}, INIT_STATE);
    default:
        return state;
    }
}