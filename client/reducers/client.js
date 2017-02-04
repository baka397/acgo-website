//导入初始化登录状态
import {pageSize} from '../config';

import {UPDATE_CLIENT_CACHE,UPDATE_CLIENT_CACHE_DIR,CLEAN_CLIENT_CACHE,CLEAN_CLIENT} from '../actions/client';

const INIT_STATE={
    cache:0,
    dir:''
};

export default function client(state = INIT_STATE, action) {
    switch (action.type) {
        case UPDATE_CLIENT_CACHE:
            return Object.assign({},state,{
                cache:action.size
            });
        case UPDATE_CLIENT_CACHE_DIR:
            return Object.assign({},state,{
                dir:action.dir
            });
        case CLEAN_CLIENT_CACHE:
            return Object.assign({},state,{
                cache:INIT_STATE.cache
            });
            break;
        case CLEAN_CLIENT:
            return Object.assign({},INIT_STATE);
            break;
        default:
            return state;
    }
}