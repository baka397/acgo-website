import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux'; //router跳转方法
import {Link} from 'react-router';
import {clientPath} from '../../../config';
import {getParams,getImageUrl,isObjEmpty,authRole} from '../../../common/tool';
import {copperWidth,copperHeight} from '../../../config';
import {fetch} from '../../../common/api';
import {windowOpen} from '../../../common/ipc';

import AnimeGroup from '../../../components/anime/group.jsx';

import {getAnimeDetail,cleanAnime} from '../../../actions/anime';
import {subAnime} from '../../../actions/anime_sub';
import {getAnimeGroupList,cleanAnimeGroup} from '../../../actions/anime_group';
import {modalUpdate,modalClean} from '../../../actions/modal';

function propMap(state,ownProps){
    return {
        client:state.client,
        animeDetail:state.anime.detail,
        animeSub:state.animeSub.content,
        animeGroup:state.animeGroup,
        animeWatch:state.animeWatch,
        profile:state.profile,
        routing:ownProps
    };
}

//封装组件
class Anime extends Component {
    constructor(props){
        super(props);
        const {role} = this.props.profile;
        let groupBtns=[];
        if(authRole('admin',role)){
            groupBtns=groupBtns.concat(['add','task','edit']);
        }
        this.state={
            tags:{},
            groupBtns
        };
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
    componentDidUpdate(){
        const {animeDetail,routing,dispatch} = this.props;
        const {tags} = this.state;
        let params=getParams(routing);
        let beforeParams=getParams(this.props.routing);
        if(params.id!==beforeParams.id){
            this.setState({
                tags:{}
            });
            this.handleClear();
            this.handleGetDetail();
        }
        else if(!isObjEmpty(animeDetail)&&isObjEmpty(tags)){//获取标签数据
            let promiseList=[];
            dispatch(modalUpdate({
                loading:true
            }));
            promiseList.push(fetch('tag',{
                ids:animeDetail.tag.toString(),
                type:1
            }));
            promiseList.push(fetch('tag',{
                ids:animeDetail.staff.toString(),
                type:2
            }));
            promiseList.push(fetch('tag',{
                ids:animeDetail.cv.toString(),
                type:3
            }));
            Promise.all(promiseList).then(result=>{
                dispatch(modalClean('loading'));
                let tagsList={};
                result.forEach((res)=>{
                    res.data.content.forEach(item=>{
                        tagsList[item._id]=item.name;
                    });
                });
                this.setState({
                    tags:tagsList
                });
            }).catch(()=>{
                dispatch(modalClean('loading'));
            });
        }
    }
    componentWillUnmount(){
        this.handleClear();
    }
    render() {
        const {animeDetail,animeSub,animeGroup,animeWatch} = this.props;
        const {tags,groupBtns} = this.state;
        let subBtn,epContent,epBtn;
        if(isObjEmpty(animeDetail)){
            return null;
        }
        if(animeDetail.public_status===1){
            epBtn=<Link className="btn btn-block btn-primary" to={clientPath+'/dashboard/anime-group/add?animeId='+animeDetail._id}><i className="icon icon-tv m-r-sm"></i>添加剧集</Link>;
            epContent=(
                <div className="app-content">
                    <AnimeGroup group={animeGroup} btns={groupBtns} onGroupClick={this.handleGroupClick} watch={animeWatch} />
                </div>
            );
        }else{
            epContent=(
                <div className="app-content">
                    <p className="m">该信息还没有审核,暂时没法添加剧集哦</p>
                </div>
            );
        }
        if(animeSub[animeDetail._id]){
            subBtn=<a className="btn btn-block btn-light" onClick={()=>this.handleSub(-1)}><i className="icon icon-star m-r-sm"></i>取消订阅</a>;
        }else{
            subBtn=<a className="btn btn-block btn-info" onClick={()=>this.handleSub(1)}><i className="icon icon-star-full m-r-sm"></i>立即订阅</a>;
        }
        return (
            <div className="app-anime m">
                <div className="app-anime-title">
                    <h1 className="pull-left">{animeDetail.name}</h1>
                    <Link to={clientPath+'/dashboard/anime/edit?id='+animeDetail._id} className="m-l-hg"><i className="icon icon-edit m-r-sm"></i>编辑动画信息</Link>
                </div>
                <div className="app-anime-main">
                    <div className="cover">
                        <p className="m-b-sm">
                            <img src={getImageUrl(animeDetail.cover,animeDetail.cover_clip,copperWidth)} width={copperWidth} height={copperHeight} />
                        </p>
                        <div className="btns">
                            {subBtn}
                            {epBtn}
                        </div>
                    </div>
                    <div className="ep app-block">{epContent}</div>
                </div>
                <div className="app-anime-desc app-block m-t">
                    <div className="app-block-title"><i className="icon icon-list m-r-sm"></i>动画详情</div>
                    <div className="app-block-content">
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
            </div>
        );
    }
    handleGetDetail(){
        const {routing,dispatch} = this.props;
        let params=getParams(routing);
        dispatch(getAnimeDetail(params));
        dispatch(getAnimeGroupList({
            animeId:params.id
        }));
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
        const {dispatch,client} = this.props;
        if(client.config&&parseInt(client.config.animeWin)===1){
            windowOpen('/window/play/?groupId='+id+'&ep='+ep);
        }
        else dispatch(push(clientPath+'/dashboard/anime/play/?groupId='+id+'&ep='+ep));
    }
}

Anime.propTypes={
    client:PropTypes.object.isRequired,
    animeDetail:PropTypes.object.isRequired,
    animeSub:PropTypes.object.isRequired,
    animeGroup:PropTypes.object.isRequired,
    animeWatch:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(Anime);