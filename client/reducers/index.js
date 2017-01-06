/**
 * Reducer - index
 * 汇总
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import modal from './modal';
import user from './user';
import anime from './anime';

export const reducer = combineReducers({
    modal,
    user,
    anime,
    routing: routerReducer
})