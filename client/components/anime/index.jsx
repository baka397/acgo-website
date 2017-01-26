import React, {PropTypes,Component} from 'react';

import Simple from './simple.jsx';
import Sub from './sub.jsx';

//封装组件
class Anime extends Component {
    render() {
        const {order,datas,watchDatas,type} = this.props;
        return (
            <div className="app-anime-list">
            {order.map(id=>{
                let animeData=datas[id];
                switch(type){
                    case 'simple':
                        return <Simple key={id} data={animeData} />
                        break;
                    case 'sub':
                        let watchData={};
                        let updateAt=0;
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
                            })
                        }
                        //处理观看记录
                        return <Sub key={id} data={animeData} watchData={watchData} />
                    default:
                        return null;
                }
            })}
            </div>
        )
    }
}

Anime.propTypes={
    order:PropTypes.array.isRequired,
    datas:PropTypes.object.isRequired,
    watchDatas:PropTypes.object,
    type:PropTypes.string.isRequired
}

export default Anime;