import React, {PropTypes,Component} from 'react';
import {isClient} from '../../common/tool';
import {fetch} from '../../common/api';

import Bilibili from './bilibili.jsx';
import Dilidili from './dilidili.jsx';
import Unable from './unable.jsx';
import LoadModal from './loadModal.jsx';

//封装组件
class Player extends Component {
    constructor(props){
        super(props);
        this.state={
            url:'',
            loaded:false,
            error:false
        }
        this.handleLoad = this.handleLoad.bind(this);
        this.handleLoadError = this.handleLoadError.bind(this);
    }
    componentDidMount(){
        this.handleGetUrl();
    }
    shouldComponentUpdate(nextProps, nextState){
        const {id} = this.props;
        const {url,loaded} = this.state;
        if(id===nextProps.id&&url===nextState.url&&loaded===nextState.loaded) return false;
        return true;
    }
    componentDidUpdate(prevProps, prevState){
        const {id} = this.props;
        if(id!==prevProps.id){
            this.setState({
                url:'',
                loaded:false
            })
            this.handleGetUrl();
        }
    }
    render(){
        const {url,loaded,error} = this.state;
        const {type} = this.props;
        let player,loadModal;
        if(error) return (
            <div className="app-player">
                <div className="app-tip m-t-hg">
                    <div className="app-tip-title">
                        <i className="icon icon-unpass"></i>
                    </div>
                    <div className="app-tip-message">
                        <p>播放器载入错误</p>
                    </div>
                </div>
            </div>
        )
        if(!url) return (
            <div className="app-player">
                <div className="app-tip m-t-hg">
                    <div className="app-tip-title">
                        <i className="icon icon-reload"></i>
                    </div>
                    <div className="app-tip-message">
                        <p>播放器载入中,请稍后</p>
                    </div>
                </div>
            </div>
        );
        if(isClient()){
            switch(type){
                case 1: //B站
                    player=<Bilibili url={url} onLoad={this.handleLoad} onLoadError={this.handleLoadError} />
                    break;
                case 2: //D站
                    player=<Dilidili url={url} onLoad={this.handleLoad} onLoadError={this.handleLoadError} />
                    break;
            }
            if(!loaded){
                loadModal=<LoadModal />
            }
        }else{
            player=<Unable url={url} />
        }
        return (
            <div className="app-player">
                {player}
                {loadModal}
            </div>
        )
    }
    handleGetUrl(){
        const {id} = this.props;
        fetch('animeItemDetail',{
            id
        }).then((res)=>{
            this.setState({
                url:res.data.url
            })
        }).catch((err)=>{
            this.setState({
                error:true
            })
        })
    }
    handleLoad(){
        this.setState({
            loaded:true
        })
    }
    handleLoadError(){
        this.setState({
            error:true
        })
    }
}

Player.propTypes={
    id:PropTypes.string.isRequired,
    type:PropTypes.number.isRequired
}

export default Player;