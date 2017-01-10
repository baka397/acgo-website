/**
 * Reducer - index
 * 汇总
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import modal from './modal';
import app from './app';
import user from './user';
import anime from './anime';
import animeSub from './anime_sub';

export const reducer = combineReducers({
    modal,
    app,
    user,
    anime,
    animeSub,
    routing: routerReducer
})