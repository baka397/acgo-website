import React, {PropTypes,Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../../config';
import {type} from '../../enums/anime_group';

import Page from '../page/index.jsx';

//封装组件
class Group extends Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {group} = this.props;
        if(group.page===nextProps.group.page&&group.total===nextProps.group.total) return false;
        return true;
    }
    render() {
        const {btns} = this.props;
        const {pageSize,page,total,order,content} = this.props.group;
        let groupContent;
        if(total===0){
            groupContent=(
                <div className="group-empty">暂无剧集数据</div>
            )
        }else{
            groupContent=(
                <div className="group-content">
                    {order.map((id)=>{
                        let item=content[id];
                        return (
                            <div key={id} className="group-item">
                                <div className="group-item-title">
                                    <div className="pull-right">
                                        {btns.map((btn)=>{
                                            switch(btn){
                                                case 'list':
                                                    return <a key={btn} onClick={(e)=>{this.handlePageClick(id,1)}}><i className="icon icon-list m-r-sm"></i>分集列表</a>;
                                                    break;
                                                case 'edit':
                                                    return <Link key={btn} className="m-l" to={clientPath+'/dashboard/anime-group/edit?id='+id}><i className="icon icon-edit m-r-sm"></i>编辑</Link>;
                                                    break;
                                                default:
                                                    return null;
                                            }
                                        })}
                                    </div>
                                    <h3>{type[item.type]}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
        return (
            <div className="app-group-list">
                {groupContent}
            </div>
        )
    }
    handlePageClick(groupId,page){
        const {onGroupClick} = this.props;
        onGroupClick(groupId,page);
    }
}

Group.propTypes={
    group:PropTypes.object.isRequired,
    btns:PropTypes.array.isRequired,
    onGroupClick:PropTypes.func.isRequired
}

export default Group;