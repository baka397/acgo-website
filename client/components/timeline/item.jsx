import React, {PropTypes,Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../../config';
import {formatDate,getImageUrl,strIntercept} from '../../common/tool';

import Avatar from '../avatar/index.jsx';

//封装组件
class TimelineItem extends Component {
    shouldComponentUpdate(nextProps){
        const {data} = this.props;
        if(data._id===nextProps.data._id) return false;
        return true;
    }
    render() {
        const {data} = this.props;
        return (
            <div className="app-timeline-item app-column-item">
                <div className="item-active">
                    <Avatar avatar={data.avatar} avatarClip={data.avatar_clip} size="small" />
                    <Link to={clientPath+'/dashboard/user/'+data.sub_user}>{data.nickname}</Link>订阅了<Link to={clientPath+'/dashboard/anime/'+data.anime_id}>{data.name}</Link>
                    <span className="text-light">{formatDate(data.update_at,'YYYY-MM-DD hh:mm:ss')}</span>
                </div>
                <div className="item-desc">
                    <img src={getImageUrl(data.cover,data.cover_clip,120)} width={120} height={72} />
                    <span className="text-light">
                        {strIntercept(data.desc,50)}
                    </span>
                </div>
            </div>
        );
    }
}


TimelineItem.propTypes={
    data: PropTypes.object.isRequired
};

export default TimelineItem;