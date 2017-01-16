import React, {PropTypes,Component} from 'react';
import {isClent} from '../../common/tool';
import {fetch} from '../../common/api';

import Unable from './unable.jsx';

//封装组件
class Player extends Component {
    constructor(props){
        super(props);
        this.state={
            url:''
        }
    }
    componentDidMount(){
        this.handleGetUrl();
    }
    shouldComponentUpdate(nextProps, nextState){
        const {id} = this.props;
        const {url} = this.state;
        if(id===nextProps.id&&url===nextState.url) return false;
        return true;
    }
    componentDidUpdate(prevProps, prevState){
        const {id} = this.props;
        if(id!==prevProps.id){
            this.setState({
                url:''
            })
            this.handleGetUrl();
        }
    }
    render(){
        const {url} = this.state;
        const {type} = this.props;
        let player;
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
        if(isClent()){
            switch(type){
                case 1:
                    break;
                case 2:
                    break;
            }
        }else{
            player=<Unable url={url} />
        }
        return (
            <div className="app-player">
                {player}
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
        })
    }
}

Player.propTypes={
    id:PropTypes.string.isRequired,
    type:PropTypes.number.isRequired
}

export default Player;