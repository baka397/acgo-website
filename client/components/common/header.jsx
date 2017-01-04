import React, {PropTypes,Component} from 'react';
import Icon from './header_icon.jsx';

//封装组件
class Header extends Component {
    shouldComponentUpdate(nextProps, nextState){
        const { routeInfo } = this.props;
        if(routeInfo.locationBeforeTransitions.pathname===nextProps.routeInfo.locationBeforeTransitions.pathname) return false;
        return true;
    }
    render() {
        const { icons,routeInfo } = this.props;
        let title='';
        switch(routeInfo.locationBeforeTransitions.pathname){
            case '/client/common/':
                title='登录';
                break;
            case '/client/common/register':
                title='注册';
                break;
            default:
                title='未定义';
        }
        return (
            <div className="app-header">
                <Icon icons={icons} />
                {title}
            </div>
        )
    }
}


Header.propTypes={
    routeInfo: PropTypes.object.isRequired,
    icons: PropTypes.array.isRequired
}

export default Header;