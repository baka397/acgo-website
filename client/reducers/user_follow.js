//导入配置数据
import {pageSize} from '../config';
import {UPDATE_USER_FOLLOW,CLEAN_USER_FOLLOW} from '../actions/user';

const INIT_STATE={
    content:{},
    order:[],
    page:1,
    pageSize:pageSize,
    total:0
};

export default function userFollow(state = Object.assign({},INIT_STATE), action) {
    let content = {},order = [];
    switch (action.type) {
    case UPDATE_USER_FOLLOW:
        if(!action.data) return state;
        action.data.content.forEach(function(item){
            order.push(item._id);
            content[item._id]=Object.assign({},item);
        });
        return Object.assign({},state,{
            content,
            order,
            page:action.data.page,
            pageSize:action.data.pageSize,
            total:action.data.total
        });
    case CLEAN_USER_FOLLOW:
        return Object.assign({},INIT_STATE);
    default:
        return state;
    }
}