import React, {PropTypes,Component} from 'react';

//封装组件
class Header extends Component {
    render() {
        const {icons} = this.props;
        return (
            <div className="app-header-icon">
                {icons.map((icon)=>{
                    switch(icon){
                        case 'min':
                            return (<a className="btn-success header-icon-min" key="icon" title="最小化" onClick={(e)=>{this.handleIconClick('min')}}></a>);
                            break;
                        case 'close':
                            return (<a className="btn-danger header-icon-close" key="close" title="关闭" onClick={(e)=>{this.handleIconClick('close')}}></a>);
                            break;
                        default:
                            return null;
                    }
                })}
            </div>
        )
    }
    handleIconClick(iconName){
        const {onIconClick} = this.props;
        onIconClick(iconName);
    }
}


Header.propTypes={
    icons: PropTypes.array.isRequired,
    onIconClick: PropTypes.func.isRequired
}

export default Header;