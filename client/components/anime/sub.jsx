import React, {PropTypes,Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../../config';
import {getImageUrl} from '../../common/tool';

//封装组件
class Sub extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
    render() {
        const {data,watchData} = this.props;
        let watchPercent=0,player,link;
        if(data.groups){

        }else{
            link=clientPath+'/dashboard/anime/'+data._id;
            player=<span className="player player-disabled">暂无剧集</span>
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