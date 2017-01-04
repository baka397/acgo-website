import React, {PropTypes,Component} from 'react';

import Icon from './header_icon.jsx';

//封装组件
class Header extends Component {
    constructor(props){
        super(props);
        this.handleIconClick = this.handleIconClick.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {title} = this.props;
        if(title===nextProps.title) return false;
        return true;
    }
    render() {
        const {icons,title} = this.props;
        return (
            <div className="app-header">
                <Icon icons={icons} onIconClick={this.handleIconClick} />
                {title}
            </div>
        )
    }
    handleIconClick(iconName){
        const {onIconClick} = this.props;
        onIconClick(iconName);
    }
}


Header.propTypes={
    title: PropTypes.string.isRequired,
    icons: PropTypes.array.isRequired,
    onIconClick: PropTypes.func.isRequired
}

export default Header;