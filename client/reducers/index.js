/**
 * Reducer - index
 * 汇总
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
export const reducer = combineReducers({
  routing: routerReducer
})