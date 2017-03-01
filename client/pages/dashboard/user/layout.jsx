import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {getParams} from '../../../common/tool';

import Avatar from '../../../components/avatar/index.jsx';
import Tab from '../../../components/tab/index.jsx';

import {getUserProfile,getUserRelation,followUser,unfollowUser,cleanUser} from '../../../actions/user';
import FOLLOW from '../../../enums/follow';

function propMap(state,ownProps){
    return {
        user:state.user,
        profile:state.profile,
        routing:ownProps
    };
}

//封装组件
class UserLayout extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.handleUpdateUserProfile();
    }
    componentDidUpdate(prevProps){
        const {routing} = this.props;
        let beforeParams=getParams(prevProps.routing);
        let params=getParams(routing);
        if(params.id!==beforeParams.id){
            this.handleUpdateUserProfile();
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(cleanUser());
    }
    render() {
        const {user,routing} = this.props;
        let followBtn,followTip;
        let params=getParams(routing);
        const tab=[
            {
                name:'喜好',
                link:'/dashboard/user/'+params.id
            },{
                name:'订阅',
                link:'/dashboard/user/'+params.id+'/timeline'
            },{
                name:'关注',
                link:'/dashboard/user/'+params.id+'/follow'
            },{
                name:'粉丝',
                link:'/dashboard/user/'+params.id+'/fans'
            }
        ];
        //当为非本人时
        if(user.relation.status>-2){
            switch(user.relation.status){
            case -1:
                followBtn=(
                    <a className="btn btn-info btn-block m-b-sm" onClick={()=>this.handleFollowClick()}><i className="icon icon-star m-r-sm"></i>立即关注</a>   
                );
                followTip=(
                    <span className="text-light"><i className="icon icon-star-full m-r-sm"></i>{FOLLOW.relation[user.relation.status]}</span>
                );
                break;
            case 0:
                followBtn=(
                    <a className="btn btn-info btn-block" onClick={()=>this.handleFollowClick()}><i className="icon icon-star m-r-sm"></i>立即关注</a>
                );
                break;
            case 1:
                followBtn=(
                    <a className="btn btn-light btn-block" onClick={()=>this.handleFollowClick(user.relation.id)}><i className="icon icon-star-full m-r-sm"></i>已经关注</a>
                );
                break;
            case 2:
                followBtn=(
                    <a className="btn btn-light btn-block m-b-sm" onClick={()=>this.handleFollowClick(user.relation.id)}><i className="icon icon-star-full m-r-sm"></i>已经关注</a>
                );
                followTip=(
                    <span className="text-light"><i className="icon icon-each m-r-sm"></i>{FOLLOW.relation[user.relation.status]}</span>
                );
                break;
            }
        }
        return (
            <div className="app-user m">
            <div className="app-user-sidebar">
                <div className="text-center">
                    <Avatar avatar={user.profile.avatar} avatarClip={user.profile.avatar_clip} size="large" />
                    <div className="follow-btn">
                        {followBtn}
                        {followTip}
                    </div>
                </div>
                <div className="app-block app-block-round">
                    <div className="app-title"><i className="icon icon-profile m-r-sm"></i>{user.profile.nickname}</div>
                    <div className="app-content">{user.profile.desc?user.profile.desc:'暂无介绍'}</div>
                </div>
            </div>
            <div className="app-user-content">
            <Tab tab={tab} />
            {this.props.children}
            </div>
            </div>
        );
    }
    handleUpdateUserProfile(){
        const {profile,routing,dispatch} = this.props;
        let params=getParams(routing);
        dispatch(cleanUser());
        dispatch(getUserProfile(params.id));
        dispatch(getUserRelation(profile._id,params.id));
    }
    handleFollowClick(id){
        const {profile,user,dispatch} = this.props;
        if(id){
            dispatch(unfollowUser(profile._id,user.profile._id,id));
        }else{
            dispatch(followUser(profile._id,user.profile._id));
        }
    }
}
UserLayout.propTypes={
    user:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    children:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(UserLayout);