/**
 * Reducer - index
 * 汇总
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';

export const reducer = combineReducers({
    user,
    routing: routerReducer
})