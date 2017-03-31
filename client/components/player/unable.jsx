import React, {PropTypes,Component} from 'react';

//封装组件
class PlayerUnable extends Component {
    shouldComponentUpdate(nextProps){
        const {url} = this.props;
        if(url===nextProps.url) return false;
        return true;
    }
    render(){
        const {url} = this.props;
        return (
            <div className="app-tip m-t-hg">
                <div className="app-tip-title">
                    <i className="icon icon-ban"></i>
                </div>
                <div className="app-tip-message">
                    <p className="m-b">播放器仅支持客户端访问</p>
                    <p>
                        <a className="btn btn-light" href={url} target="_blank"><i className="icon icon-open m-r-sm"></i>直接访问地址</a>
                    </p>
                </div>
            </div>
        );
    }
}

PlayerUnable.propTypes={
    url:PropTypes.string.isRequired
};

export default PlayerUnable;