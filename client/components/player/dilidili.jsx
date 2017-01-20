import React, {PropTypes,Component} from 'react';
import WebView from 'react-electron-web-view';
import scriptText from './scripts/dilidili.text';
import scriptText2 from './scripts/dilidili2.text';
import styleText from './styles/page.text';

//封装组件
class PlayerDilidili extends Component {
    constructor(props){
        super(props);
        this.state={
            loadTime:0
        }
        this.handleLoad = this.handleLoad.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {url} = this.props;
        if(url===nextProps.url) return false;
        return true;
    }
    render(){
        const {url,onLoadError} = this.props;
        return (
            <div className="app-player-content">
                <WebView src={url} plugins onDidStopLoading={this.handleLoad} onDidFailLoad={onLoadError} ref="player" disablewebsecurity></WebView>
            </div>
        )
    }
    handleLoad(){
        const {onLoad} = this.props;
        const {loadTime} = this.state;
        if(loadTime===0){
            this.setState({
                loadTime:1
            });
            this.refs.player.executeJavaScript(scriptText);
        }else{
            this.refs.player.insertCSS(styleText);
            this.refs.player.executeJavaScript(scriptText2);
            setTimeout(function(){
                onLoad();
            },100)
        }
    }
}

PlayerDilidili.propTypes={
    url:PropTypes.string.isRequired,
    onLoad:PropTypes.func.isRequired,
    onLoadError:PropTypes.func.isRequired
}

export default PlayerDilidili;