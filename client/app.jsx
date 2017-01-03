//加载依赖
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import {reducer} from './reducers/';
const middleware = routerMiddleware(browserHistory);
//插入中间件
let createStoreWithMiddleware = applyMiddleware(
    thunk,
    middleware
)(createStore)

let store;
if(process.env.NODE_ENV==='production'){
    store=createStoreWithMiddleware(reducer,{});
}
else{
    //载入redux debug插件
    function configureStore(initialState) {
        let debugMiddlewareStore = createStoreWithMiddleware(reducer, initialState, 
            window.devToolsExtension ? window.devToolsExtension() : undefined
        );
        return debugMiddlewareStore;
    }
    // Store
    store = configureStore({});
}

// Sync dispatched route actions to the history
const history = syncHistoryWithStore(browserHistory,store);

//加载页面
import Layout from './pages/layout.jsx'; //框架
import FrameDefault from './pages/frame_default.jsx'; //默认框架

import Home from './pages/home.jsx'; //首页

//创建路由
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <Route path="client" component={Layout}>
            <IndexRoute component={Home}/>
            <Route path="common" component={FrameDefault} getIndexRoute={(partialNextState, callback)=>{
                require.ensure([], function (require) {
                    callback(null, {
                        component: require('./pages/login.jsx').default,
                    })
                })
            }}>
            </Route>
        </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)

