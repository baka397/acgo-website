import React, {PropTypes,Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../../config';
import {type} from '../../enums/anime_group';

//封装组件
class Group extends Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        const {group,watch} = this.props;
        if(group.page===nextProps.group.page&&group.total===nextProps.group.total&&watch.order.length===nextProps.watch.order.length) return false;
        return true;
    }
    render() {
        const {btns,watch} = this.props;
        const {total,order,content} = this.props.group;
        let groupContent;
        if(total===0){
            groupContent=(
                <div className="group-empty">暂无剧集数据</div>
            );
        }else{
            groupContent=(
                <div className="group-content">
                    {order.map((id)=>{
                        let item=content[id];
                        let watchInfo=watch.content[id]||{};
                        let playInfo;
                        if(item.episode_cur){
                            playInfo=<span className="play m-r"><i className="icon icon-play m-r-sm"></i>点击{watchInfo.watch_ep?'继续':'开始'}播放</span>;
                        }else{
                            playInfo=<span className="play m-r"><i className="icon icon-ban m-r-sm"></i>暂时无法播放</span>;
                        }
                        return (
                            <div key={id} className={'group-item'+(item.episode_cur?'':' group-item-disabled')}>
                                <div className="group-item-title">
                                    <h3 onClick={()=>{this.handlePageClick(id,watchInfo.watch_ep,item.episode_cur,item.episode_start);}}>
                                        {playInfo}
                                        {type[item.type]}<span className="m-l">(更新至{item.episode_cur}话,已观看{watchInfo.watch_ep||0}话)</span>
                                    </h3>
                                    <div className="btns">
                                        {btns.map((btn)=>{
                                            switch(btn){
                                            case 'add':
                                                return <Link key={btn} className="m-l" to={clientPath+'/dashboard/anime-group/item/add?groupId='+id}><i className="icon icon-plus m-r-sm"></i>添加分集</Link>;
                                            case 'task':
                                                return <Link key={btn} className="m-l" to={clientPath+'/dashboard/anime-group/task/?groupId='+id}><i className="icon icon-search m-r-sm"></i>查询抓取任务</Link>;
                                            case 'edit':
                                                return <Link key={btn} className="m-l" to={clientPath+'/dashboard/anime-group/edit?id='+id}><i className="icon icon-edit m-r-sm"></i>编辑剧集信息</Link>;
                                            default:
                                                return null;
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return (
            <div className="app-group-list">
                {groupContent}
            </div>
        );
    }
    handlePageClick(groupId,watched,curEp,startEp){
        const {onGroupClick} = this.props;
        if(!curEp) return;
        let watchedNum=watched?watched+1:(startEp||1);
        if(watchedNum>curEp) watchedNum=curEp;
        onGroupClick(groupId,watchedNum);
    }
}

Group.propTypes={
    group:PropTypes.object.isRequired,
    btns:PropTypes.array.isRequired,
    watch:PropTypes.object.isRequired,
    onGroupClick:PropTypes.func.isRequired
};

export default Group;