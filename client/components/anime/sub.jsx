import React, {PropTypes,Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../../config';
import {getImageUrl} from '../../common/tool';

//封装组件
class Sub extends Component {
    shouldComponentUpdate(nextProps, nextState){
        const {_id} = this.props.data;
        const {percent} = this.props.watchData;
        if(_id===nextProps.data._id&&percent===nextProps.watchData.percent) return false;
        return true;
    }
    render() {
        const {data,watchData} = this.props;
        let watchPercent=0,player,link;
        if(data.groups){
            if(watchData.total>0){
                watchPercent=watchData.percent;
                let ep=watchData.watch_ep+1;
                link=clientPath+'/dashboard/anime/play/?groupId='+watchData.group_id+'&ep='+(ep>watchData.total?watchData.total:ep);
                player=<span className="player"><i className="icon icon-play m-r-sm"></i>继续播放</span>
            }else{
                link=clientPath+'/dashboard/anime/'+data._id;
                player=<span className="player"><i className="icon icon-list m-r-sm"></i>查看剧集</span>
            }
        }else{
            link=clientPath+'/dashboard/anime/'+data._id;
            player=<span className="player"><i className="icon icon-ban m-r-sm"></i>暂无剧集</span>
        }
        return (
            <div className="app-anime-item">
                <div className="cover">
                    <Link to={link}>
                        <img src={getImageUrl(data.cover,data.cover_clip,150)} width="150" height="90" />
                        {player}
                    </Link>
                </div>
                <div className="progress"><span style={{width:watchPercent+'%'}}></span></div>
                <p className="title" title={data.name}><Link to={clientPath+'/dashboard/anime/'+data._id}>{data.name}</Link></p>
                <p className="alias" title={data.alias}>{data.alias}</p>
            </div>
        )
    }
}

Sub.propTypes={
    data:PropTypes.object.isRequired,
    watchData:PropTypes.object
}

export default Sub;