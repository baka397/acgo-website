//加载依赖
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
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
import CommonLayout from './pages/common/layout.jsx'; //未登录框架
import DashboardLayout from './pages/dashboard/layout.jsx'; //登录框架

import Index from './pages/index.jsx'; //首页
import NotFound from './pages/not_found.jsx'; //404页面

//创建路由
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <Route path="client" component={Layout}>
            <IndexRoute component={Index}/>
            <Route path="common" component={CommonLayout} getIndexRoute={(partialNextState, callback)=>{
                require.ensure([], function (require) {
                    callback(null, {
                        component: require('./pages/common/login.jsx').default,
                    })
                })
            }}>
                <Route path="register" getIndexRoute={(partialNextState, callback)=>{
                    require.ensure([], function (require) {
                        callback(null, {
                            component: require('./pages/common/register.jsx').default,
                        })
                    })
                }} />
            </Route>
            <Route path="dashboard" component={DashboardLayout} getIndexRoute={(partialNextState, callback)=>{
                require.ensure([], function (require) {
                    callback(null, {
                        component: require('./pages/dashboard/index.jsx').default,
                    })
                })
            }}>
                <Route path="search" getIndexRoute={(partialNextState, callback)=>{
                    require.ensure([], function (require) {
                        callback(null, {
                            component: require('./pages/dashboard/search.jsx').default,
                        })
                    })
                }} />
                <Route path="anime">
                    <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                        require.ensure([], function (require) {
                            callback(null, {
                                component: require('./pages/dashboard/animeEdit.jsx').default,
                            })
                        })
                    }} />
                    <Route path="audit" getIndexRoute={(partialNextState, callback)=>{
                        require.ensure([], function (require) {
                            callback(null, {
                                component: require('./pages/dashboard/animeAudit.jsx').default,
                            })
                        })
                    }} />
                    <Route path=":id" getIndexRoute={(partialNextState, callback)=>{
                        require.ensure([], function (require) {
                            callback(null, {
                                component: require('./pages/dashboard/anime.jsx').default,
                            })
                        })
                    }} />
                </Route>
            </Route>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)

