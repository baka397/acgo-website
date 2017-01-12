import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getParams,getImageUrl,isObjEmpty} from '../../common/tool';
import {copperWidth,copperHeight} from '../../config';
import {fetch} from '../../common/api';

import {getAnimeDetail,cleanAnime} from '../../actions/anime';
import {subAnime} from '../../actions/anime_sub';
import {modalUpdate,modalClean} from '../../actions/modal';

function propMap(state,ownProps){
    return {
        animeDetail:state.anime.detail,
        animeSub:state.animeSub.content,
        routing:ownProps
    }
}

//封装组件
class Anime extends Component {
    constructor(props){
        super(props);
        this.state={
            tags:{}
        }
    }
    componentDidMount(){
        const {routing,dispatch} = this.props;
        dispatch(getAnimeDetail(getParams(routing)));
    }
    shouldComponentUpdate(nextProps, nextState){
        const {animeDetail,animeSub} = this.props;
        const {tags} = nextState;
        let animeId=animeDetail._id;
        let beforeAnimeId=nextProps.animeDetail._id;
        if(animeId===beforeAnimeId&&animeSub[animeId]===nextProps.animeSub[animeId]&&isObjEmpty(tags)) return false;
        return true;
    }
    componentDidUpdate(prevProps, prevState){
        const {animeDetail,routing,dispatch} = this.props;
        const {tags} = this.state;
        let params=getParams(routing);
        let beforeParams=getParams(this.props.routing);
        if(params.id!==beforeParams.id){
            this.setState({
                tags:{}
            })
            dispatch(getAnimeDetail(getParams(routing)));
        }
        else if(isObjEmpty(tags)){//获取标签数据
            let tagsId=[].concat(animeDetail.tag,animeDetail.staff,animeDetail.cv);
            dispatch(modalUpdate({
                loading:true
            }));
            fetch('tag',{
                ids:tagsId.toString()
            }).then(res=>{
                dispatch(modalClean('loading'));
                let tagsList={};
                res.data.content.forEach(item=>{
                    tagsList[item._id]=item.name;
                })
                this.setState({
                    tags:tagsList
                });
            }).catch(err=>{
                dispatch(modalClean('loading'));
            })
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(cleanAnime());
    }
    render() {
        const {animeDetail,animeSub} = this.props;
        const {tags} = this.state;
        let watchBtn,subBtn,epContent;
        if(isObjEmpty(animeDetail)){
            return null;
        }
        if(animeDetail.public_status===1){
            if(!animeSub[animeDetail._id]) watchBtn=<a>我已看过</a>;
            epContent=(
                <div className="app-block">
                    <a className="btn btn-info pull-right"><i className="icon icon-plus m-r-sm"></i>添加剧集</a>
                    <div className="app-title">
                        <i className="icon icon-list m-r-sm"></i>剧集列表
                    </div>
                    <div className="app-content">
                        <p>暂无剧集数据</p>
                    </div>
                </div>
            )
        }else{
            epContent=(
                <div className="app-block">
                    <div className="app-title"><i className="icon icon-list m-r-sm"></i>剧集列表</div>
                    <div className="app-content">
                        <p>还未审核,暂时不能显示和添加剧集</p>
                    </div>
                </div>
            )
        }
        if(animeSub[animeDetail._id]){
            subBtn=<a className="btn btn-light btn-sm m-l" onClick={()=>{this.handleSub(-1)}}><i className="icon icon-star m-r-sm"></i>取消订阅</a>;
        }else{
            subBtn=<a className="btn btn-info btn-sm m-l" onClick={()=>{this.handleSub(1)}}><i className="icon icon-star-full m-r-sm"></i>立即订阅</a>;
        }
        return (
            <div className="app-anime">
                <div className="app-anime-cover">
                    <img src={getImageUrl(animeDetail.cover,animeDetail.cover_clip,copperWidth)} width={copperWidth} height={copperHeight} />
                    <div className="title">
                        <div className="sub pull-right">
                            {watchBtn}
                            {subBtn}
                        </div>
                        <h1>{animeDetail.name}</h1>
                    </div>
                    <div className="desc">
                        <p>{animeDetail.desc}</p>
                        <ul className="m-t-hg app-list-label">
                            <li>
                                <div className="label">标签</div>
                                <div className="content app-list-inline">
                                    {animeDetail.tag.map(function(id){
                                        return <span key={id}>{tags[id]}</span>;
                                    })}
                                </div>
                            </li>
                            <li>
                                <div className="label">声优</div>
                                <div className="content app-list-inline">
                                    {animeDetail.cv.map(function(id){
                                        return <span key={id}>{tags[id]}</span>;
                                    })}
                                </div>
                            </li>
                            <li>
                                <div className="label">制作</div>
                                <div className="content app-list-inline">
                                    {animeDetail.staff.map(function(id){
                                        return <span key={id}>{tags[id]}</span>;
                                    })}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="m">
                    {epContent}
                </div>
            </div>
        )
    }
    handleSub(status){
        const {animeDetail,dispatch} = this.props;
        dispatch(subAnime(animeDetail._id,status));
    }
}
export default connect(propMap)(Anime);