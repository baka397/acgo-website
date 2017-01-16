import React, {PropTypes,Component} from 'react';

import Simple from './simple.jsx';
import Sub from './sub.jsx';

//封装组件
class Anime extends Component {
    shouldComponentUpdate(nextProps, nextState){
        const {order,type,watchDatas} = this.props;
        if(type===nextProps.type&&order.length===nextProps.order.length&&Object.keys(watchDatas).length===Object.keys(nextProps.watchDatas).length) return false;
        return true;
    }
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
                        let watchData;
                        animeData.groups.some((group)=>{
                            if(watchDatas[group.id]){
                                watchData=Object.assign({},watchDatas[group.id]);
                                watchData.total=group.episode_cur;
                                watchData.percent=Math.ceil(watchData.watch_ep/group.episode_cur);
                                return true;
                            }
                            return false;
                        })
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