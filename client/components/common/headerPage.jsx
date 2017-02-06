import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import {clientPath} from '../../config';
import {windowClose,windowMin,windowMax} from '../../common/ipc';

import Icon from './headerIcon.jsx';
import Header from './header.jsx';

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
                case '/getpwd':
                    return '发送找回密码邮件';
                    break;
                case '/resetpwd':
                    return '重设密码';
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
                case '/anime/add':
                    return '添加动画';
                    break;
                case '/anime/edit':
                    return '编辑动画';
                    break;
                case '/anime/play':
                    return '播放动画';
                    break;
                case '/anime-group/add':
                    return '添加剧集';
                    break;
                case '/anime-group/edit':
                    return '编辑剧集';
                    break;
                case '/anime-group/item/add':
                    return '添加剧集分集';
                    break;
                case '/anime-group/item/edit':
                    return '编辑剧集分集';
                    break;
                case '/anime-group/task':
                    return '查询抓取任务';
                    break;
                case '/anime/audit':
                    return '审核动画';
                    break;
                case '/config':
                    return '修改密码';
                    break;
                case '/config/profile':
                    return '修改资料';
                    break;
                case '/config/client':
                    return '客户端配置';
                    break;
                default:
                    if(/\/anime\/\w+$/.test(service)) return '动画详情';
            }
            break;
    }
    return '';
}

function getBackStatus(channel,service){
    switch(channel){
        case 'dashboard':
            switch(service){
                case '/anime/add':
                case '/anime/edit':
                case '/anime/play':
                case '/anime-group/add':
                case '/anime-group/edit':
                case '/anime-group/item/add':
                case '/anime-group/item/edit':
                case '/anime-group/task':
                    return true;
                    break;
                case '/anime/audit':
                    return false;
                    break;
                default:
                    if(/\/anime\/\w+$/.test(service)) return true;
            }
            break;
    }
    return false;
}

//封装组件
class HeaderPage extends Component {
    constructor(props){
        super(props);
        this.handleIconClick = this.handleIconClick.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {route} = this.props;
        if(route.location.pathname===nextProps.route.location.pathname) return false;
        return true;
    }
    render() {
        const {icons,route} = this.props;
        let regRule=new RegExp('^'+clientPath);
        let curPath=route.location.pathname.replace(regRule,'');
        let curChannel=curPath.replace(/\/([^\/]+)\/\S*/,'$1');
        let curService=curPath.replace(/\/[^\/]+(\/\S*)/,'$1').replace(/\/$/,'');
        return <Header icons={icons} title={getTitle(curChannel,curService)} back={getBackStatus(curChannel,curService)} onIconClick={this.handleIconClick} />
    }
    handleIconClick(iconName){
        const {dispatch} = this.props;
        switch(iconName){
            case 'back':
                dispatch(goBack());
                break;
            case 'min':
                windowMin();
                break;
            case 'max':
                windowMax();
                break;
            case 'close':
                windowClose();
                break;
        }
    }
}


HeaderPage.propTypes={
    route: PropTypes.object.isRequired,
    icons: PropTypes.array.isRequired
}

export default connect()(HeaderPage);