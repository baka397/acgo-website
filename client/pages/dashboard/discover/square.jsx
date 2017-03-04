import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import {escape,trim} from 'validator';
import {clientPath} from '../../../config';
import {getParams} from '../../../common/tool';

import FormSearch from '../../../components/form/search.jsx';
import Tab from '../../../components/tab/index.jsx';
import Timline from '../../../components/timeline/index.jsx';
import Page from '../../../components/page/index.jsx';

import {getTimelineAll,getTimelineById,cleanTimeline} from '../../../actions/timeline';

function propMap(state,ownProps){
    return {
        timeline:state.timeline,
        routing:ownProps
    };
}

const formRule=[
    {
        name:'keyword',
        type:'text',
        placeholder:'输入动画名称搜索'
    },
    {
        label:'立即搜索',
        type:'submit',
        icon:'search'
    }
];

const tab=[
    {
        name:'好友动态',
        link:'/dashboard/discover/square/friend'
    },{
        name:'最新动态',
        link:'/dashboard/discover/square/all'
    }
];

//封装组件
class Square extends Component {
    constructor(props){
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.handleUpdateTimeline(1);
    }
    componentDidUpdate(prevProps){
        const {routing} = this.props;
        let beforeParams=getParams(prevProps.routing);
        let params=getParams(routing);
        if(beforeParams.type!==params.type){
            this.handleUpdateTimeline(1);
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(cleanTimeline());
    }
    render() {
        const {timeline,routing} = this.props;
        let emptyTip;
        let params=getParams(routing);
        if(params.type==='friend'&&timeline.total===0){
            emptyTip=(
                <div className="app-tip">
                    <div className="app-tip-title">
                        <p><i className="icon icon-star-empty"></i></p>
                    </div>
                    <div className="app-tip-message">
                        <p className="m-b">暂无好友动态</p>
                        <p><Link to={clientPath+'/dashboard/discover/square/all'} className="btn btn-info"><i className="icon icon-list m-r-sm"></i>查看更多动态</Link></p>
                    </div>
                </div>
            );
        }
        return (
            <div className="app-square m">
                <div className="m-t-hg m-b-hg">
                    <FormSearch rules={formRule} onSubmit={this.handleSubmit} />
                </div>
                <Tab tab={tab} />
                <Timline data={timeline.content} order={timeline.order} closeTip={true} />
                <Page page={timeline.page} pageSize={timeline.pageSize} total={timeline.total} onPageClick={this.handlePageClick} />
                {emptyTip}
            </div>
        );
    }
    handleSubmit(data){
        const {dispatch} = this.props;
        let keyword=trim(data.keyword);
        if(keyword){
            dispatch(push(clientPath+'/dashboard/discover/search/?keyword='+escape(keyword)));
        }
    }
    handleUpdateTimeline(page){
        const {routing,dispatch} = this.props;
        let params=getParams(routing);
        switch(params.type){
        case 'all':
            dispatch(getTimelineAll(page));
            break;
        case 'friend':
            dispatch(getTimelineById('friend',page));
            break;
        }
    }
    handlePageClick(page){
        this.handleUpdateTimeline(page);
    }
}
Square.propTypes={
    timeline:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(Square);