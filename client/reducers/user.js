//导入初始化登录状态
import USER from 'user';

import {UPDATE_USER,CLEAN_USER} from '../actions/user';

const INIT_STATE={};

export default function user(state = Object.assign({},INIT_STATE,USER), action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({},action.data);
            break;
        case CLEAN_USER:
            return Object.assign({},INIT_STATE);
            break;
        default:
            return state;
    }
}