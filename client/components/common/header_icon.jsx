import React, {PropTypes,Component} from 'react';

//封装组件
class Header extends Component {
    render() {
        const { icons } = this.props;
        return (
            <div className="app-header-icon">
                {icons.map((icon)=>{
                    switch(icon){
                        case 'min':
                            return (<a className="btn-success header-icon-min" key="icon" title="最小化"></a>);
                            break;
                        case 'close':
                            return (<a className="btn-danger header-icon-close" key="close" title="关闭"></a>);
                            break;
                        default:
                            return null;
                    }
                })}
            </div>
        )
    }
}


Header.propTypes={
    icons: PropTypes.array.isRequired
}

export default Header;