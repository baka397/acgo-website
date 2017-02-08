//导入配置数据
import {pageSize} from '../config';

import {UPDATE_ANIME_ITEM,CLEAN_ANIME_ITEM,UPDATE_ANIME_ITEM_DETAIL} from '../actions/anime_item';

const INIT_STATE={
    content:{},
    order:[],
    page:1,
    pageSize:pageSize,
    total:0,
    detail:{}
};

export default function animeItem(state = INIT_STATE, action) {
    let detail,content = {},order = [];
    switch (action.type) {
    case UPDATE_ANIME_ITEM_DETAIL:
        detail=Object.assign({},action.data);
        return Object.assign({},state,{
            detail
        });
    case UPDATE_ANIME_ITEM:
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
    case CLEAN_ANIME_ITEM:
        return Object.assign({},INIT_STATE);
    default:
        return state;
    }
}