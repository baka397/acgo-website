import {UPDATE_ANIME_WATCH,CLEAN_ANIME_WATCH} from '../actions/anime_watch';

const INIT_STATE={
    content:{},
    order:[]
};

export default function animeSub(state = INIT_STATE, action) {
    let content = {},order = [];
    switch (action.type) {
    case UPDATE_ANIME_WATCH:
        if(!action.data) return state;
        action.data.forEach(function(item){
            order.push(item.group_id);
            content[item.group_id]=Object.assign({},item);
        });
        return Object.assign({},state,{
            content,
            order
        });
    case CLEAN_ANIME_WATCH:
        return Object.assign({},INIT_STATE);
    default:
        return state;
    }
}