//导入初始化登录状态
import {pageSize} from '../config';

import {UPDATE_ANIME,CLEAN_ANIME} from '../actions/anime';

const INIT_STATE={
    content:{},
    order:[],
    page:1,
    pageSize:pageSize,
    total:0
};

export default function anime(state = INIT_STATE, action) {
    switch (action.type) {
        case UPDATE_ANIME:
            if(!action.data) return state;
            let content = {};
            let order = [];
            action.data.content.forEach(function(item){
                order.push(item._id);
                content[item._id]=Object.assign({},item);
            });
            return Object.assign({},state,{
                content:content,
                order:order,
                page:action.data.page,
                pageSize:action.data.pageSize,
                total:action.data.total
            });
            break;
        case CLEAN_ANIME:
            return Object.assign({},INIT_STATE);
            break;
        default:
            return state;
    }
}