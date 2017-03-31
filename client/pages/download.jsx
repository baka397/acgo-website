import React,{PropTypes,Component} from 'react';
import {connect} from 'react-redux';

import Progress from '../components/progress/index.jsx';
import {startClientDownload} from '../common/ipc';

function propMap(state){
    return {
        client:state.client
    };
}

//封装组件
class Download extends Component {
    constructor(props){
        super(props);
        this.handleCloseWindow = this.handleCloseWindow.bind(this);
    }
    componentDidMount(){
        startClientDownload();
    }
    render() {
        const {client} = this.props;
        let progress;
        if(client.percent===100){
            progress = (
                <div className="app-tip p-t-lg">
                    <div className="app-tip-message m-b-hg">
                        <p>下载成功</p>
                        <p>你可能需要重启应用才能启用新功能</p>
                    </div>
                    <p className="m"><button className="btn btn-primary btn-lg" onClick={this.handleCloseWindow}>关闭窗口</button></p>
                </div>
            );
        }else if(client.percent<0){
            progress = (
                <div className="app-tip p-t-lg">
                    <p className="app-tip-message m-b-hg">下载失败</p>
                    <p className="m"><button className="btn btn-primary btn-lg" onClick={this.handleCloseWindow}>关闭窗口</button></p>
                </div>
            );
        }else{
            progress = <Progress percent={client.percent} />;
        }
        return (
            <div className="app-download app-background">
                {progress}
            </div>
        );
    }
    handleCloseWindow(){
        window.close();
    }
}

Download.propTypes={
    client:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};

export default connect(propMap)(Download);