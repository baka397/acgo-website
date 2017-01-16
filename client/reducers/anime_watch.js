//导入初始化登录状态
import {pageSize} from '../config';

import {UPDATE_ANIME_WATCH,CLEAN_ANIME_WATCH} from '../actions/anime_watch';

const INIT_STATE={
    content:{},
    order:[]
};

export default function animeSub(state = INIT_STATE, action) {
    switch (action.type) {
        case UPDATE_ANIME_WATCH:
            if(!action.data) return state;
            let content = {};
            let order = [];
            action.data.forEach(function(item){
                order.push(item.group_id);
                content[item.group_id]=Object.assign({},item);
            });
            return Object.assign({},state,{
                content,
                order
            });
            break;
        case CLEAN_ANIME_WATCH:
            return Object.assign({},INIT_STATE);
            break;
        default:
            return state;
    }
}