import {UPDATE_USER_PROFILE,CLEAN_USER,UPDATE_USER_RELATION} from '../actions/user';

const INIT_STATE={
    profile:{},
    relation:{}
};

export default function user(state = Object.assign({},INIT_STATE), action) {
    switch (action.type) {
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