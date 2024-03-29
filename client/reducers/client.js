import {UPDATE_CLIENT_CACHE,UPDATE_CLIENT_CACHE_DIR,CLEAN_CLIENT_CACHE,CLEAN_CLIENT,UPDATE_CLIENT_DOWNLOAD_PROGRESS,UPDATE_CLIENT_CONFIG} from '../actions/client';

const INIT_STATE={
    cache:0,
    dir:'',
    percent:0,
    config:null
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
    case UPDATE_CLIENT_DOWNLOAD_PROGRESS:
        return Object.assign({},state,{
            percent:action.percent
        });
    case UPDATE_CLIENT_CONFIG:
        return Object.assign({},state,{
            config:Object.assign({},action.data)
        });
    case CLEAN_CLIENT_CACHE:
        return Object.assign({},state,{
            cache:INIT_STATE.cache
        });
    case CLEAN_CLIENT:
        return Object.assign({},INIT_STATE);
    default:
        return state;
    }
}