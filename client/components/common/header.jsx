import React, {PropTypes,Component} from 'react';

import Icon from './header_icon.jsx';

//封装组件
class Header extends Component {
    constructor(props){
        super(props);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {title} = this.props;
        if(title===nextProps.title) return false;
        return true;
    }
    render() {
        const {icons,title,back} = this.props;
        let titleContent;
        if(back){
            titleContent=(<a onClick={this.handleBack}><i className="icon icon-back m-r-sm"></i>{title}</a>)
        }else{
            titleContent=title;
        }
        return (
            <div className="app-header">
                <Icon icons={icons} onIconClick={this.handleIconClick} />
                {titleContent}
            </div>
        )
    }
    handleIconClick(iconName){
        const {onIconClick} = this.props;
        onIconClick(iconName);
    }
    handleBack(){
        const {onIconClick} = this.props;
        onIconClick('back');
    }
}


Header.propTypes={
    title: PropTypes.string.isRequired,
    back: PropTypes.bool.isRequired,
    icons: PropTypes.array.isRequired,
    onIconClick: PropTypes.func.isRequired
}

export default Header;