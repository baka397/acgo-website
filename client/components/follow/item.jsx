import React, {PropTypes,Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../../config';
import {strIntercept} from '../../common/tool';

import Avatar from '../avatar/index.jsx';

//封装组件
class FollowItem extends Component {
    shouldComponentUpdate(nextProps){
        const {data,type} = this.props;
        if(data._id===nextProps.data._id&&type===nextProps.type) return false;
        return true;
    }
    render() {
        const {data,type} = this.props;
        return (
            <div className="app-follow-item app-column-item">
                <div className="item-info">
                    <Avatar avatar={data.avatar} avatarClip={data.avatar_clip} size="small" />
                    <Link to={clientPath+'/dashboard/user/'+(type==='follow'?data.follow_user:data.create_user)}>{data.nickname}</Link>
                </div>
                <div className="item-desc">
                    {data.desc?strIntercept(data.desc,20):'暂无介绍'}
                </div>
            </div>
        );
    }
}


FollowItem.propTypes={
    data: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['follow','fan']).isRequired
};

export default FollowItem;