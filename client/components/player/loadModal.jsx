import React, {PropTypes,Component} from 'react';

//封装组件
class LoadModal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
    render(){
        return (
            <div className="app-player-loading">
                <div className="app-spinner"></div>
                <p className="load-tip">正在载入播放器,请稍后</p>
            </div>
        )
    }
}

export default LoadModal;