//导入配置数据
import {pageSize} from '../config';

import {UPDATE_ANIME_GROUP,CLEAN_ANIME_GROUP,UPDATE_ANIME_GROUP_DETAIL} from '../actions/anime_group';

const INIT_STATE={
    content:{},
    order:[],
    page:1,
    pageSize:pageSize,
    total:0,
    detail:{}
};

export default function animeGroup(state = INIT_STATE, action) {
    let detail,content = {},order = [];
    switch (action.type) {
    case UPDATE_ANIME_GROUP_DETAIL:
        detail=Object.assign({},action.data);
        return Object.assign({},state,{
            detail
        });
    case UPDATE_ANIME_GROUP:
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
    case CLEAN_ANIME_GROUP:
        return Object.assign({},INIT_STATE);
    default:
        return state;
    }
}