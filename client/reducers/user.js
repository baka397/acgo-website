//导入配置数据
import {pageSize} from '../config';
import {UPDATE_USER_PROFILE,CLEAN_USER,UPDATE_USER_RELATION,UPDATE_USER_DIMENSION} from '../actions/user';

const INIT_STATE={
    profile:{},
    relation:{},
    dimension:{},
    follow:{
        content:{},
        order:[],
        page:1,
        pageSize:pageSize,
        total:0
    }
};

export default function user(state = Object.assign({},INIT_STATE), action) {
    switch (action.type) {
    case UPDATE_USER_DIMENSION:
        return Object.assign({},state,{
            dimension:action.data
        });
    case UPDATE_USER_RELATION:
        return Object.assign({},state,{
            relation:action.data
        });
    case UPDATE_USER_PROFILE:
        return Object.assign({},state,{
            profile:action.data
        });
    case CLEAN_USER:
        return Object.assign({},INIT_STATE);
    default:
        return state;
    }
}