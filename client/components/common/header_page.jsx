import React, {PropTypes,Component} from 'react';

import Icon from './header_icon.jsx';
import Header from './header.jsx';

import {clientPath} from '../../config';

/**
 * 获取页面标题
 * @param  {String} channel 渠道名
 * @param  {String} service 服务名
 * @return {String}         标题
 */
function getTitle(channel,service){
    switch(channel){
        case 'common':
            switch(service){
                case '':
                    return '登录';
                    break;
                case '/register':
                    return '注册';
                    break;
            }
            break;
        case 'dashboard':
            switch(service){
                case '':
                    return '控制台';
                    break;
                case '/search':
                    return '探索';
                    break;
            }
            break;
    }
    return '';
}

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
        let regRule=new RegExp('^'+clientPath);
        let curPath=route.locationBeforeTransitions.pathname.replace(regRule,'');
        let curChannel=curPath.replace(/\/([^\/]+)\/\S*/,'$1');
        let curService=curPath.replace(/\/[^\/]+(\/\S*)/,'$1').replace(/\/$/,'');
        let title=getTitle(curChannel,curService);
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