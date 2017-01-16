import React, {Component} from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux'; //router跳转方法
import {Link} from 'react-router';
import {clientPath} from '../../config';
import {getQuery,getPage,authRole,serialize} from '../../common/tool';

import Player from '../../components/player/index.jsx';
import Playlist from '../../components/player/playlist.jsx';

import {getAnimeGroupDetail,cleanAnimeGroup} from '../../actions/anime_group';
import {getAnimeItemList,cleanAnimeItem} from '../../actions/anime_item';
import {addAnimeWatch} from '../../actions/anime_watch';

function propMap(state,ownProps){
    return {
        animeGroupDetail:state.animeGroup.detail,
        animeItem:state.animeItem,
        user:state.user,
        routing:ownProps
    }
}

//封装组件
class AnimePlay extends Component {
    constructor(props){
        super(props);
        const {role} = this.props.user;
        let playBtns=[];
        if(authRole('admin',role)){
            playBtns=playBtns.concat(['edit']);
        }
        this.state={
            curItemId:'',
            playBtns
        }
        this.handleGroupItemClick = this.handleGroupItemClick.bind(this);
        this.handleGroupItemPageClick = this.handleGroupItemPageClick.bind(this);
    }
    componentDidMount(){
        const {routing,dispatch} = this.props;
        let query=getQuery(routing);
        if(query.groupId){
            dispatch(getAnimeGroupDetail({
                id:query.groupId
            }));
            this.handleEpLoad();
        }
    }
    componentDidUpdate(prevProps, prevState){
        const {animeItem,routing,dispatch} = this.props;
        const {curItemId} = this.state;
        let query=getQuery(routing);
        let beforeQuery=getQuery(routing);
        if(animeItem.order.length>0&&!curItemId){
            let curId='';
            animeItem.order.some((key)=>{
                curId=key;
                if(animeItem.content[key].episode_no===parseInt(query.ep)){
                    return true;
                }
                else false;
            })
            this.setState({
                curItemId:curId
            })
        }
        if(curItemId&&curItemId!==prevState.curItemId){
            dispatch(addAnimeWatch({
                groupId:query.groupId,
                groupItemId:curItemId
            }))
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(cleanAnimeGroup());
        dispatch(cleanAnimeItem());
    }
    render() {
        const {animeItem,animeGroupDetail} = this.props;
        const {curItemId,playBtns} = this.state;
        if(!curItemId) return null;
        return (
            <div className="app-anime-player m">
                <div className="player-content">
                    <div className="clear">
                        <div className="pull-right">
                            {playBtns.map((btn)=>{
                                switch(btn){
                                    case 'edit':
                                        return <Link key={btn} to={clientPath+'/dashboard/anime-group/item/edit?id='+curItemId} className="m-l-hg"><i className="icon icon-edit m-r-sm"></i>编辑分集信息</Link>;
                                        break;
                                }
                            })}
                        </div>
                        <h1>第{animeItem.content[curItemId].episode_no}话:{animeItem.content[curItemId].episode_name}</h1>
                    </div>
                    <Player id={curItemId} type={animeGroupDetail.type} />
                </div>
                <div className="player-sidebar">
                    <Playlist content={animeItem.content} order={animeItem.order} page={animeItem.page} pageSize={animeItem.pageSize} total={animeItem.total} playId={curItemId} onItemClick={this.handleGroupItemClick} onPageClick={this.handleGroupItemPageClick} />
                </div>
            </div>
        )
    }
    handleEpLoad(){
        const {routing,dispatch} = this.props;
        let query=getQuery(routing);
        let page=getPage(query.ep);
        dispatch(getAnimeItemList({
            groupId:query.groupId,
            page
        }))
    }
    handleGroupItemClick(id,ep){
        const {routing,dispatch} = this.props;
        let query=getQuery(routing);
        this.setState({
            curItemId:id
        })
        dispatch(replace(clientPath+'/dashboard/anime/play/?'+serialize(Object.assign({},query,{
            ep
        }))))
    }
    handleGroupItemPageClick(page){
        const {routing,dispatch} = this.props;
        let query=getQuery(routing);
        dispatch(getAnimeItemList({
            groupId:query.groupId,
            page
        }))
    }
}
export default connect(propMap)(AnimePlay);