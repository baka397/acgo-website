//加载依赖
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk';
import {reducer} from './reducers/';

//加载页面
import Layout from './pages/layout.jsx'; //框架

//插入中间件
let createStoreWithMiddleware = applyMiddleware(
  thunk
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
const history = syncHistoryWithStore( browserHistory, store)

//创建路由
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/client/" component={Layout}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)