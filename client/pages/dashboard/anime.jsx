import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux'; //router跳转方法
import {Link} from 'react-router';
import {clientPath} from '../../config';
import {getParams,getImageUrl,isObjEmpty,authRole} from '../../common/tool';
import {copperWidth,copperHeight} from '../../config';
import {fetch} from '../../common/api';

import AnimeGroup from '../../components/anime/group.jsx';

import {getAnimeDetail,cleanAnime} from '../../actions/anime';
import {subAnime} from '../../actions/anime_sub';
import {getAnimeGroupList,cleanAnimeGroup} from '../../actions/anime_group';
import {modalUpdate,modalClean} from '../../actions/modal';

function propMap(state,ownProps){
    return {
        animeDetail:state.anime.detail,
        animeSub:state.animeSub.content,
        animeGroup:state.animeGroup,
        animeWatch:state.animeWatch,
        user:state.user,
        routing:ownProps
    }
}

//封装组件
class Anime extends Component {
    constructor(props){
        super(props);
        const {role} = this.props.user;
        let groupBtns=[];
        if(authRole('admin',role)){
            groupBtns=groupBtns.concat(['add','task','edit']);
        }
        this.state={
            tags:{},
            groupBtns
        }
        this.handleGroupClick = this.handleGroupClick.bind(this);
    }
    componentDidMount(){
        this.handleGetDetail();
    }
    shouldComponentUpdate(nextProps, nextState){
        const {animeDetail,animeSub,animeGroup,animeWatch} = this.props;
        const {tags} = nextState;
        let animeId=animeDetail._id;
        let beforeAnimeId=nextProps.animeDetail._id;
        if(animeId===beforeAnimeId&&animeSub[animeId]===nextProps.animeSub[animeId]&&isObjEmpty(tags)&&animeGroup.page===nextProps.animeGroup.page&&animeGroup.total===nextProps.animeGroup.total&&animeWatch.order.length===nextProps.animeWatch.order.length) return false;
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
            this.handleClear();
            this.handleGetDetail();
        }
        else if(isObjEmpty(tags)){//获取标签数据
            let tagsId=[].concat(animeDetail.tag,animeDetail.staff,animeDetail.cv);
            dispatch(modalUpdate({
                loading:true
            }));
            fetch('tag',{
                ids:tagsId.toString()
            },'POST').then(res=>{
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
        this.handleClear();
    }
    render() {
        const {animeDetail,animeSub,animeGroup,animeWatch} = this.props;
        const {tags,groupBtns} = this.state;
        let subBtn,editBtn,epContent;
        if(isObjEmpty(animeDetail)){
            return null;
        }
        if(animeDetail.public_status===1){
            editBtn=<Link to={clientPath+'/dashboard/anime/edit?id='+animeDetail._id} className="m-l-hg"><i className="icon icon-edit m-r-sm"></i>编辑动画信息</Link>;
            epContent=(
                <div className="app-block">
                    <Link className="btn btn-info pull-right" to={clientPath+'/dashboard/anime-group/add?animeId='+animeDetail._id}><i className="icon icon-plus m-r-sm"></i>添加剧集</Link>
                    <div className="app-title">
                        <i className="icon icon-list m-r-sm"></i>剧集列表
                    </div>
                    <div className="app-content">
                        <AnimeGroup group={animeGroup} btns={groupBtns} onGroupClick={this.handleGroupClick} watch={animeWatch} />
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
            <div className="app-anime m-t">
                <div className="app-anime-cover">
                    <img src={getImageUrl(animeDetail.cover,animeDetail.cover_clip,copperWidth)} width={copperWidth} height={copperHeight} />
                    <div className="title">
                        <div className="sub pull-right">
                            {subBtn}
                        </div>
                        <h1 className="pull-left">{animeDetail.name}</h1>
                        {editBtn}
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
    handleGetDetail(){
        const {routing,dispatch} = this.props;
        let params=getParams(routing);
        dispatch(getAnimeDetail(params));
        dispatch(getAnimeGroupList({
            animeId:params.id
        }))
    }
    handleClear(){
        const {dispatch} = this.props;
        dispatch(cleanAnime());
        dispatch(cleanAnimeGroup());
    }
    handleSub(status){
        const {animeDetail,dispatch} = this.props;
        dispatch(subAnime(animeDetail._id,status));
    }
    handleGroupClick(id,ep){
        const {dispatch} = this.props;
        dispatch(push(clientPath+'/dashboard/anime/play/?groupId='+id+'&ep='+ep));
    }
}
export default connect(propMap)(Anime);