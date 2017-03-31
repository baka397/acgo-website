import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';

import Simple from './simple.jsx';
import Sub from './sub.jsx';

function propMap(state){
    return {
        client:state.client
    };
}

//封装组件
class Anime extends Component {
    render() {
        const {order,datas,watchDatas,type,client} = this.props;
        return (
            <div className="app-anime-list">
            {order.map(id=>{
                let animeData=datas[id];
                let watchData={};
                let updateAt=0;
                switch(type){
                case 'simple':
                    return <Simple key={id} data={animeData} />;
                case 'sub':
                    if(animeData.groups){
                        animeData.groups.forEach((group)=>{
                            if(watchDatas[group.id]){
                                let curUpdateAt=watchDatas[group.id].update_at?new Date(watchDatas[group.id].update_at).getTime():0;
                                if(updateAt>curUpdateAt){
                                    return true;
                                }
                                watchData=Object.assign({},watchDatas[group.id]);
                                watchData.total=group.episode_cur;
                                if(group.episode_cur>0) watchData.percent=Math.ceil((watchData.watch_ep/group.episode_cur)*100);
                                updateAt=curUpdateAt;
                            }
                        });
                    }
                    //处理观看记录
                    return <Sub key={id} data={animeData} watchData={watchData} openWin={client.config&&parseInt(client.config.animeWin)===1} />;
                default:
                    return null;
                }
            })}
            </div>
        );
    }
}

Anime.propTypes={
    client:PropTypes.object.isRequired,
    order:PropTypes.array.isRequired,
    datas:PropTypes.object.isRequired,
    watchDatas:PropTypes.object,
    type:PropTypes.string.isRequired
};

export default connect(propMap)(Anime);