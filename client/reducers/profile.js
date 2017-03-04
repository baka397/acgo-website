//导入初始化登录状态
import PROFILE from 'profile';

import {UPDATE_PROFILE,CLEAN_PROFILE} from '../actions/profile';

const INIT_STATE={};

export default function profile(state = Object.assign({},INIT_STATE,PROFILE), action) {
    switch (action.type) {
    case UPDATE_PROFILE:
        return Object.assign({},action.data);
    case CLEAN_PROFILE:
        return Object.assign({},INIT_STATE);
    default:
        return state;
    }
}