/**
 * Reducer - index
 * 汇总
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import user from './user';
import modal from './modal';

export const reducer = combineReducers({
    user,
    modal,
    routing: routerReducer
})