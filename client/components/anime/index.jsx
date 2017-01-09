import React, {PropTypes,Component} from 'react';

import Simple from './simple.jsx';

//封装组件
class Anime extends Component {
    shouldComponentUpdate(nextProps, nextState){
        const {order,datas,type} = this.props;
        if(type==='simple') return false;
        return true;
    }
    render() {
        const {order,datas,type} = this.props;
        return (
            <div className="app-anime-list">
            {order.map(id=>{
                switch(type){
                    case 'simple':
                        return <Simple key={id} data={datas[id]} />
                        break;
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
    type:PropTypes.string.isRequired
}

export default Anime;