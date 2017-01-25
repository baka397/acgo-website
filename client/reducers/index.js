/**
 * Reducer - index
 * 汇总
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import modal from './modal';
import app from './app';
import user from './user';
import client from './client';
import anime from './anime';
import animeSub from './anime_sub';
import animeWatch from './anime_watch';
import animeGroup from './anime_group';
import animeItem from './anime_item';
import animeTask from './anime_task';

export const reducer = combineReducers({
    modal,
    app,
    user,
    client,
    anime,
    animeSub,
    animeWatch,
    animeGroup,
    animeItem,
    animeTask,
    routing: routerReducer
})