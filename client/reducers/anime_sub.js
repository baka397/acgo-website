import {UPDATE_ANIME_SUB,CLEAN_ANIME_SUB} from '../actions/anime_sub';

const INIT_STATE={
    content:{},
    order:[]
};

export default function animeSub(state = INIT_STATE, action) {
    let content = {},order = [];
    switch (action.type) {
    case UPDATE_ANIME_SUB:
        if(!action.data) return state;
        action.data.forEach(function(item){
            order.push(item._id);
            content[item._id]=Object.assign({},item);
        });
        return Object.assign({},state,{
            content,
            order
        });
    case CLEAN_ANIME_SUB:
        return Object.assign({},INIT_STATE);
    default:
        return state;
    }
}