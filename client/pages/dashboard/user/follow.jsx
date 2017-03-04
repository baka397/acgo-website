import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {getParams} from '../../../common/tool';

import Follow from '../../../components/follow/index.jsx';
import Page from '../../../components/page/index.jsx';

import {getUserFollow,cleanUserFollow} from '../../../actions/user';

function propMap(state,ownProps){
    return {
        userFollow:state.userFollow,
        routing:ownProps
    };
}

//封装组件
class UserTimeline extends Component {
    constructor(props){
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    componentDidMount(){
        this.handleUpdateUserFollow(1);
    }
    componentDidUpdate(prevProps){
        const {routing} = this.props;
        let beforeParams=getParams(prevProps.routing);
        let params=getParams(routing);
        if(params.id!==beforeParams.id){
            this.handleUpdateUserFollow(1);
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(cleanUserFollow());
    }
    render() {
        const {userFollow} = this.props;
        return (
            <div className="app-user-timeline">
                <Follow data={userFollow.content} order={userFollow.order} type="follow" />
                <Page page={userFollow.page} pageSize={userFollow.pageSize} total={userFollow.total} onPageClick={this.handlePageClick} />
            </div>
        );
    }
    handleUpdateUserFollow(page){
        const {routing,dispatch} = this.props;
        let params=getParams(routing);
        dispatch(getUserFollow(params.id,page));
    }
    handlePageClick(page){
        this.handleUpdateUserFollow(page);
    }
}
UserTimeline.propTypes={
    userFollow:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(UserTimeline);