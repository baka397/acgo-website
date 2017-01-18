import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isClent} from '../../common/tool';

import Tab from '../../components/tab/index.jsx';

let tab=[
    {
        name:'修改密码',
        link:'/dashboard/config/'
    },{
        name:'修改资料',
        link:'/dashboard/config/profile/'
    }
]
if(isClent()){
    tab=tab.concat([
        {
            name:'客户端配置',
            link:'/dashboard/config/client/'
        }
    ])
}

//封装组件
class ConfigLayout extends Component {
    render() {
        return (
            <div className="app-config m">
                <Tab tab={tab} />
                <div className="app-config-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default connect()(ConfigLayout);