import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {getParams} from '../../../common/tool';

import Timeline from '../../../components/timeline/index.jsx';
import Page from '../../../components/page/index.jsx';

import {getTimelineById,cleanTimeline} from '../../../actions/timeline';

function propMap(state,ownProps){
    return {
        timeline:state.timeline,
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
        this.handleUpdateTimeline(1);
    }
    componentDidUpdate(prevProps){
        const {routing} = this.props;
        let beforeParams=getParams(prevProps.routing);
        let params=getParams(routing);
        if(params.id!==beforeParams.id){
            this.handleUpdateTimeline(1);
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(cleanTimeline());
    }
    render() {
        const {timeline} = this.props;
        return (
            <div className="app-user-timeline">
                <Timeline data={timeline.content} order={timeline.order} />
                <Page page={timeline.page} pageSize={timeline.pageSize} total={timeline.total} onPageClick={this.handlePageClick} />
            </div>
        );
    }
    handleUpdateTimeline(page){
        const {routing,dispatch} = this.props;
        let params=getParams(routing);
        dispatch(getTimelineById(params.id,page));
    }
    handlePageClick(page){
        this.handleUpdateTimeline(page);
    }
}
UserTimeline.propTypes={
    timeline:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(UserTimeline);