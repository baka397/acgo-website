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
import ConfigLayout from './pages/dashboard/config/layout.jsx'; //配置框架
import UserLayout from './pages/dashboard/user/layout.jsx'; //用户主页框架
import WindowLayout from './pages/window/layout.jsx'; //窗口框架

import Index from './pages/index.jsx'; //首页
import NotFound from './pages/notFound.jsx'; //404页面
import Download from './pages/download.jsx'; //下载页
import Version from './pages/version.jsx'; //版本提示页

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
                <Route path="download" component={Download} />
                <Route path="version" component={Version} />
                <Route path="window" component={WindowLayout}>
                    <Route path="play" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent=require('./pages/dashboard/anime/animePlay.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        },'dashboard-anime-play');
                    }} />
                </Route>
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
                    <Route path="discover">
                        <Route path="search" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/discover/search.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-discover-search');
                        }} />
                        <Route path="square/:type" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/discover/square.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-discover-square');
                        }} />
                    </Route>
                    <Route path="anime">
                        <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/anime/animeEdit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-edit');
                        }} />
                        <Route path="edit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/anime/animeEdit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-edit');
                        }} />
                        <Route path="play" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/anime/animePlay.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-play');
                        }} />
                        <Route path="audit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/anime/animeAudit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-audit');
                        }} />
                        <Route path=":id" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/anime/anime.jsx');
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
                                let loadComponent=require('./pages/dashboard/anime-group/animeGroupEdit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-anime-group-edit');
                        }} />
                        <Route path="edit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/anime-group/animeGroupEdit.jsx');
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
                                    let loadComponent=require('./pages/dashboard/anime-group/animeGroupItemEdit.jsx');
                                    loadPage(true);
                                    callback(null, {
                                        component: loadComponent.default
                                    });
                                },'dashboard-anime-group-item-edit');
                            }} />
                            <Route path="edit" getIndexRoute={(partialNextState, callback)=>{
                                loadPage();
                                require.ensure([], function (require) {
                                    let loadComponent=require('./pages/dashboard/anime-group/animeGroupItemEdit.jsx');
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
                                let loadComponent=require('./pages/dashboard/anime-group/animeGroupTaskEdit.jsx');
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
                            let loadComponent=require('./pages/dashboard/config/password.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        },'dashboard-config-password');
                    }}>
                        <Route path="profile" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/config/profile.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-config-profile');
                        }} />
                        <Route path="client" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/config/client.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-config-client');
                        }} />
                    </Route>
                    <Route path="user/:id" component={UserLayout} getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent=require('./pages/dashboard/user/analytics.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        },'dashboard-user-analytics');
                    }}>
                        <Route path="timeline" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/user/timeline.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-user-timeline');
                        }} />
                        <Route path="follow" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/user/follow.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-user-follow');
                        }} />
                        <Route path="fan" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent=require('./pages/dashboard/user/fan.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            },'dashboard-user-fan');
                        }} />
                    </Route>
                </Route>
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>
);