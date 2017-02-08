import React, {PropTypes,Component} from 'react';

import Page from '../page/index.jsx';

//封装组件
class PlayList extends Component {
    shouldComponentUpdate(nextProps){
        const {page,total,playId} = this.props;
        if(page===nextProps.page&&total===nextProps.total&&playId===nextProps.playId) return false;
        return true;
    }
    render(){
        const {page,pageSize,total,order,content,playId,onPageClick} = this.props;
        return (
            <div className="app-playlist">
                <ul className="item-list">
                    {order.map((id)=>{
                        let item=content[id];
                        let itemIcon;
                        let itemClass;
                        if(!item) return null;
                        if(playId===id){
                            itemIcon=<i className="icon icon-play m-r-sm"></i>;
                            itemClass='active';
                        }
                        return (
                            <li key={id} onClick={()=>this.handleItemClick(id,item.episode_no,playId===id)} className={itemClass} title={item.episode_name}>
                                {itemIcon}<span>第{item.episode_no}话</span>{item.episode_name}
                            </li>
                        );
                    })}
                </ul>
                <Page page={page} pageSize={pageSize} total={total} type="simple" onPageClick={onPageClick} />
            </div>
        );
    }
    handleItemClick(id,ep,choosen){
        const {onItemClick} = this.props;
        if(choosen) return;
        onItemClick(id,ep);
    }
}

PlayList.propTypes={
    content:PropTypes.object.isRequired,
    order:PropTypes.array.isRequired,
    page:PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired,
    total:PropTypes.number.isRequired,
    playId:PropTypes.string.isRequired,
    onItemClick:PropTypes.func.isRequired,
    onPageClick:PropTypes.func.isRequired
};

export default PlayList;