import React, {PropTypes,Component} from 'react';

import WebView from '../webview/index.jsx';
import scriptText from './scripts/iqiyi.text';
import styleText from './styles/page.text';

let timer;

//封装组件
class PlayerPPTV extends Component {
    constructor(props){
        super(props);
        this.handleLoad = this.handleLoad.bind(this);
    }
    shouldComponentUpdate(nextProps){
        const {url} = this.props;
        if(url===nextProps.url) return false;
        return true;
    }
    render(){
        const {url,onLoadError} = this.props;
        return (
            <div className="app-player-content">
                <WebView src={url} plugins onDidStopLoading={this.handleLoad} onDidFailLoad={onLoadError} ref="player"></WebView>
            </div>
        );
    }
    handleLoad(){
        const {onLoad} = this.props;
        this.refs.player.insertCSS(styleText);
        this.refs.player.executeJavaScript(scriptText);
        timer=setTimeout(function(){
            onLoad();
        },500);
    }
    componentWillUnmount(){
        if(timer) clearTimeout(timer);
    }
}

PlayerPPTV.propTypes={
    url:PropTypes.string.isRequired,
    onLoad:PropTypes.func.isRequired,
    onLoadError:PropTypes.func.isRequired
};

export default PlayerPPTV;