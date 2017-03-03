import React, {PropTypes,Component} from 'react';
import {getImageUrl} from '../../common/tool';

//封装组件
class Avatar extends Component {
    shouldComponentUpdate(nextProps){
        const {avatar,avatarClip,size} = this.props;
        let validClip=Array.isArray(avatarClip)&&Array.isArray(nextProps.avatarClip);
        if(validClip){
            validClip=avatarClip.every(function(clip,index){
                return clip!==nextProps.avatarClip[index];
            });
        }
        if(size===nextProps.size&&avatar===nextProps.avatar&&validClip) return false;
        return true;
    }
    render() {
        const {avatar,avatarClip,size} = this.props;
        let avatarImage;
        let avatarSize=0;
        if(avatar){
            switch(size){
            case 'large':
                avatarSize=120;
                break;
            case 'middle':
                avatarSize=60;
                break;
            case 'small':
                avatarSize=30;
            }
            if(avatarSize>0){
                avatarImage=<img src={getImageUrl(avatar,avatarClip,avatarSize)} width={avatarSize} height={avatarSize} />;
            }
        }
        return (
            <span className={'app-avatar app-avatar-'+size}>
            {avatarImage}
            </span>
        );
    }
}


Avatar.propTypes={
    avatar: PropTypes.string,
    avatarClip: PropTypes.array,
    size: PropTypes.oneOf(['large','middle','small']).isRequired
};

export default Avatar;