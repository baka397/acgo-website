import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import {clientPath} from '../../config';
import {windowClose,windowMin,windowMax} from '../../common/ipc';

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
        case '/register':
            return '注册';
        case '/getpwd':
            return '发送找回密码邮件';
        case '/resetpwd':
            return '重设密码';
        }
        break;
    case 'dashboard':
        switch(service){
        case '':
            return '控制台';
        case '/discover/search':
            return '搜索';
        case '/discover/square/friend':
        case '/discover/square/all':
            return '发现';
        case '/anime/add':
            return '添加动画';
        case '/anime/edit':
            return '编辑动画';
        case '/anime/play':
            return '播放动画';
        case '/anime-group/add':
            return '添加剧集';
        case '/anime-group/edit':
            return '编辑剧集';
        case '/anime-group/item/add':
            return '添加剧集分集';
        case '/anime-group/item/edit':
            return '编辑剧集分集';
        case '/anime-group/task':
            return '查询抓取任务';
        case '/anime/audit':
            return '审核动画';
        case '/config':
            return '修改密码';
        case '/config/profile':
            return '修改资料';
        case '/config/client':
            return '客户端配置';
        default:
            if(/\/anime\/\w+$/.test(service)) return '动画详情';
            if(/\/user\/\w+$/.test(service)) return '用户主页';
            if(/\/user\/\w+\/timeline(\/|)$/.test(service)) return '用户动态';
            if(/\/user\/\w+\/follow(\/|)$/.test(service)) return '用户关注';
            if(/\/user\/\w+\/fan(\/|)$/.test(service)) return '用户粉丝';
        }
        break;
    case 'window':
        switch(service){
        case '/play':
            return '播放动画';
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
        case '/discover/search':
            return true;
        case '/anime/audit':
            return false;
        default:
            if(/\/(anime)\/\w+$/.test(service)) return true;
            if(/\/(user)\/[\w\/]+$/.test(service)) return true;
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
    shouldComponentUpdate(nextProps){
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
        return <Header icons={icons} title={getTitle(curChannel,curService)} back={getBackStatus(curChannel,curService)} onIconClick={this.handleIconClick} />;
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
        case 'submin':
            windowMin(true);
            break;
        case 'submax':
            windowMax(true);
            break;
        case 'subclose':
            windowClose(true);
            break;
        case 'refresh':
            window.location.reload();
            break;
        }
    }
}


HeaderPage.propTypes={
    route: PropTypes.object.isRequired,
    icons: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(HeaderPage);