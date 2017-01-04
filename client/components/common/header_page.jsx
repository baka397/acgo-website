import React, {PropTypes,Component} from 'react';

import Icon from './header_icon.jsx';
import Header from './header.jsx';

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
        switch(route.locationBeforeTransitions.pathname){
            case '/client/common/':
                title='登录';
                break;
            case '/client/common/register':
                title='注册';
                break;
            default:
                title='未定义';
        }
        return <Header icons={icons} title={title} onIconClick={this.handleIconClick} />
    }
    handleIconClick(iconName){
        const {onIconClick} = this.props;
        onIconClick(iconName);
    }
}


HeaderPage.propTypes={
    route: PropTypes.object.isRequired,
    icons: PropTypes.array.isRequired,
    onIconClick: PropTypes.func.isRequired
}

export default HeaderPage;