//导入初始化登录状态
import {pageSize} from '../config';

import {CLEAN_ANIME_TASK,UPDATE_ANIME_TASK_DETAIL} from '../actions/anime_task';

const INIT_STATE={
    detail:{}
};

export default function animeItem(state = INIT_STATE, action) {
    switch (action.type) {
        case UPDATE_ANIME_TASK_DETAIL:
            let detail=Object.assign({},{
                done:true
            },action.data);
            return Object.assign({},state,{
                detail
            });
        case CLEAN_ANIME_TASK:
            return Object.assign({},INIT_STATE);
            break;
        default:
            return state;
    }
}