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
                        return (<a className="btn-success header-icon-min" key="min" title="最小化" onClick={()=>{this.handleIconClick('min');}}></a>);
                    case 'max':
                        return (<a className="btn-info header-icon-max" key="max" title="最大化" onClick={()=>{this.handleIconClick('max');}}></a>);
                    case 'close':
                        return (<a className="btn-danger header-icon-close" key="close" title="关闭" onClick={()=>{this.handleIconClick('close');}}></a>);
                    case 'refresh':
                        return (<a className="btn-light header-icon-reload" key="refresh" title="刷新" onClick={()=>{this.handleIconClick('refresh');}}></a>);
                    default:
                        return null;
                    }
                })}
            </div>
        );
    }
    handleIconClick(iconName){
        const {onIconClick} = this.props;
        onIconClick(iconName);
    }
}


Header.propTypes={
    icons: PropTypes.array.isRequired,
    onIconClick: PropTypes.func.isRequired
};

export default Header;