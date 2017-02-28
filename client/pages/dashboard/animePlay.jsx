import React, {PropTypes,Component} from 'react';
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
        profile:state.profile,
        routing:ownProps
    };
}

//封装组件
class AnimePlay extends Component {
    constructor(props){
        super(props);
        const {role} = this.props.profile;
        let playBtns=[];
        if(authRole('admin',role)){
            playBtns=playBtns.concat(['edit']);
        }
        this.state={
            curItemId:'',
            curEpisodeNo:'',
            curEpisodeName:'',
            playBtns
        };
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
        }
    }
    componentDidUpdate(prevProps, prevState){
        const {animeGroupDetail,animeItem,routing,dispatch} = this.props;
        const {curItemId} = this.state;
        if(animeGroupDetail._id!==prevProps.animeGroupDetail._id){
            this.handleEpLoad();
        }
        let query=getQuery(routing);
        if(animeItem.order.length>0&&!curItemId){
            let curId='';
            let curEpisodeNo='';
            let curEpisodeName='';
            animeItem.order.some((key)=>{
                let curItem=animeItem.content[key];
                curId=key;
                curEpisodeNo=curItem.episode_no;
                curEpisodeName=curItem.episode_name;
                if(curItem.episode_no===parseInt(query.ep)){
                    return true;
                }
                else false;
            });
            this.setState({
                curItemId:curId,
                curEpisodeNo,
                curEpisodeName
            });
        }
        if(curItemId&&curItemId!==prevState.curItemId){
            dispatch(addAnimeWatch({
                groupId:query.groupId,
                groupItemId:curItemId
            }));
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(cleanAnimeGroup());
        dispatch(cleanAnimeItem());
    }
    render() {
        const {animeItem,animeGroupDetail} = this.props;
        const {curItemId,curEpisodeNo,curEpisodeName,playBtns} = this.state;
        if(!curItemId) return null;
        return (
            <div className="app-anime-player">
                <div className="player-content">
                    <div className="player-title clear">
                        <div className="pull-right">
                            {playBtns.map((btn)=>{
                                switch(btn){
                                case 'edit':
                                    return <Link key={btn} to={clientPath+'/dashboard/anime-group/item/edit?id='+curItemId} className="m-l-hg"><i className="icon icon-edit m-r-sm"></i>编辑分集信息</Link>;
                                }
                            })}
                        </div>
                        <h1>第{curEpisodeNo}话:{curEpisodeName}</h1>
                    </div>
                    <Player id={curItemId} type={animeGroupDetail.type} />
                </div>
                <div className="player-sidebar">
                    <Playlist content={animeItem.content} order={animeItem.order} page={animeItem.page} pageSize={animeItem.pageSize} total={animeItem.total} playId={curItemId} onItemClick={this.handleGroupItemClick} onPageClick={this.handleGroupItemPageClick} />
                </div>
            </div>
        );
    }
    handleEpLoad(){
        const {animeGroupDetail,routing,dispatch} = this.props;
        let start=animeGroupDetail.episode_start?animeGroupDetail.episode_start-1:0;
        let query=getQuery(routing);
        let page=getPage(query.ep,start);
        dispatch(getAnimeItemList({
            groupId:query.groupId,
            page
        }));
    }
    handleGroupItemClick(id,ep){
        const {animeItem,routing,dispatch} = this.props;
        let query=getQuery(routing);
        let curItem=animeItem.content[id];
        this.setState({
            curItemId:id,
            curEpisodeNo:curItem.episode_no,
            curEpisodeName:curItem.episode_name
        });
        dispatch(replace(clientPath+'/dashboard/anime/play/?'+serialize(Object.assign({},query,{
            ep
        }))));
    }
    handleGroupItemPageClick(page){
        const {routing,dispatch} = this.props;
        let query=getQuery(routing);
        dispatch(getAnimeItemList({
            groupId:query.groupId,
            page
        }));
    }
}
AnimePlay.propTypes={
    animeGroupDetail:PropTypes.object.isRequired,
    animeItem:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(AnimePlay);