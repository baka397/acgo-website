//加载依赖
import React from 'react';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import {store,history} from './store';
import {modalUpdate,modalClean} from './actions/modal';

//加载页面
import Layout from './pages/layout.jsx'; //框架
import CommonLayout from './pages/common/layout.jsx'; //未登录框架
import DashboardLayout from './pages/dashboard/layout.jsx'; //登录框架
import ConfigLayout from './pages/dashboard/configLayout.jsx'; //配置框架

import Index from './pages/index.jsx'; //首页
import NotFound from './pages/notFound.jsx'; //404页面

function loadPage(end){
    if(end){
        store.dispatch(modalClean('loading'));
    }else{
        store.dispatch(modalUpdate({
            loading:true
        }));
    }
}
export default (
    <Provider store={store}>
        <Router history={history}>
            <Route path="client" component={Layout}>
                <IndexRoute component={Index}/>
                <Route path="common" component={CommonLayout} getIndexRoute={(partialNextState, callback)=>{
                    loadPage();
                    require.ensure([], function (require) {
                        let loadComponent=require('./pages/common/login.jsx');
                        loadPage(true);
                        callback(null, {
                            component: loadComponent.default
                        });
                    },'common-login');
                }}>
                    <Route path="register" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent=require('./pages/common/register.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        },'common-register');
                    }} />
                    <Route path="getpwd" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent=require('./pages/common/getpwd.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        },'common-getpwd');
                    }} />
                    <Route path="resetpwd" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent=require('./pages/common/resetpwd.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        },'common-resetpwd');
                    }} />
                </Route>
                <Route path="dashboard" component={DashboardLayout} getIndexRoute={(partialNextState, callback)=>{
                    loadPage();
                    require.ensure([], function (require) {
                        let loadComponent=require('./pages/dashboard/index.jsx');
                        loadPage(true);
                        callback(null, {
                            component: loadComponent.default
                        });
                    },'dashboard-index');
                }}>
                    <Route path="search" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent=require('./pages/dashboard/search.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        },'dashboard-search');
                    }} />
                    <Route path="anime">
                        <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/animeEdit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-edit');
                        }} />
                        <Route path="edit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/animeEdit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-edit');
                        }} />
                        <Route path="play" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/animePlay.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-play');
                        }} />
                        <Route path="audit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/animeAudit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-audit');
                        }} />
                        <Route path=":id" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/anime.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime');
                        }} />
                    </Route>
                    <Route path="anime-group">
                        <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/animeGroupEdit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-group-edit');
                        }} />
                        <Route path="edit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/animeGroupEdit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-group-edit');
                        }} />
                        <Route path="item">
                            <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                                loadPage();
                                require.ensure([], function (require) {
                                    let loadComponent=require('./pages/dashboard/animeGroupItemEdit.jsx');
                                    loadPage(true);
                                    callback(null, {
                                        component: loadComponent.default
                                    });
                                },'dashboard-anime-group-item-edit');
                            }} />
                            <Route path="edit" getIndexRoute={(partialNextState, callback)=>{
                                loadPage();
                                require.ensure([], function (require) {
                                    let loadComponent=require('./pages/dashboard/animeGroupItemEdit.jsx');
                                    loadPage(true);
                                    callback(null, {
                                        component: loadComponent.default
                                    });
                                },'dashboard-anime-group-item-edit');
                            }} />
                        </Route>
                        <Route path="task" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/animeGroupTaskEdit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-group-task-edit');
                        }} />
                    </Route>
                    <Route path="config" component={ConfigLayout} getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent=require('./pages/dashboard/configPassword.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        },'dashboard-config-password');
                    }}>
                        <Route path="profile" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/configProfile.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-config-profile');
                        }} />
                        <Route path="client" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/configClient.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-config-client');
                        }} />
                    </Route>
                </Route>
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>
);