/**
 * Reducer - index
 * 汇总
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import modal from './modal';
import app from './app';
import profile from './profile';
import user from './user';
import userFollow from './user_follow';
import client from './client';
import anime from './anime';
import animeSub from './anime_sub';
import animeWatch from './anime_watch';
import animeGroup from './anime_group';
import animeItem from './anime_item';
import animeTask from './anime_task';
import timeline from './timeline';

export const reducer = combineReducers({
    modal,
    app,
    profile,
    user,
    userFollow,
    client,
    anime,
    animeSub,
    animeWatch,
    animeGroup,
    animeItem,
    animeTask,
    timeline,
    routing: routerReducer
});