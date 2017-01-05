import React, {PropTypes,Component} from 'react';

import Icon from './header_icon.jsx';
import Header from './header.jsx';

import {clientPath} from '../../config';

//封装组件
class HeaderPage extends Component {
    constructor(props){
        super(props);
        this.handleIconClick = this.handleIconClick.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {route} = this.props;
        if(route.locationBeforeTransitions.pathname===nextProps.route.locationBeforeTransitions.pathname) return false;
        return true;
    }
    render() {
        const {icons,route} = this.props;
        let title='';
        let regRule=new RegExp('^'+clientPath);
        switch(route.locationBeforeTransitions.pathname.replace(regRule,'')){
            case '/common/':
                title='登录';
                break;
            case '/common/register':
                title='注册';
                break;
            case '/dashboard':
                title='控制台';
                break;
            default:
                title='未定义';
        }
        return <Header icons={icons} title={title} onIconClick={this.handleIconClick} />
    }
    handleIconClick(iconName){
        console.log(iconName);
    }
}


HeaderPage.propTypes={
    route: PropTypes.object.isRequired,
    icons: PropTypes.array.isRequired
}

export default HeaderPage;