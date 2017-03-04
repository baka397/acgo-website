import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {getParams} from '../../../common/tool';
import {chartColors,chartConfig} from '../../../config';

import {Pie} from 'react-chartjs-2';

import {getUserDimension} from '../../../actions/user';

function propMap(state,ownProps){
    return {
        user:state.user,
        routing:ownProps
    };
}

//封装组件
class UserIndex extends Component {
    componentDidMount(){
        this.handleUpdateUserAnalytics();
    }
    componentDidUpdate(prevProps){
        const {routing} = this.props;
        let beforeParams=getParams(prevProps.routing);
        let params=getParams(routing);
        if(params.id!==beforeParams.id){
            this.handleUpdateUserAnalytics();
        }
    }
    render() {
        const {user} = this.props;
        let tagChart,staffChart,cvChart,emptyChart;
        emptyChart=(
            <div className="app-tip">
                <div className="app-tip-title">
                    <p><i className="icon icon-chart"></i></p>
                </div>
                <div className="app-tip-message">
                    <p className="m-b">暂无统计数据</p>
                </div>
            </div>
        );
        if(user.dimension.dtag&&user.dimension.dtag.length>0){
            let tagsData={
                labels:[],
                datasets:[
                    {
                        label:'标签TOP10',
                        borderWidth: 0,
                        data: []
                    }
                ]
            };
            tagsData.datasets[0].backgroundColor=chartColors.slice(0,user.dimension.dtag.length);
            user.dimension.dtag.forEach(function(dtag){
                tagsData.labels.push(dtag.name);
                tagsData.datasets[0].data.push(dtag.point);
            });
            tagChart=<Pie data={tagsData} options={chartConfig} />;
        }
        if(user.dimension.dstaff&&user.dimension.dstaff.length>0){
            let staffsData={
                labels:[],
                datasets:[
                    {
                        label:'制作TOP10',
                        borderWidth: 0,
                        data: []
                    }
                ]
            };
            staffsData.datasets[0].backgroundColor=chartColors.slice(0,user.dimension.dstaff.length);
            user.dimension.dstaff.forEach(function(dstaff){
                staffsData.labels.push(dstaff.name);
                staffsData.datasets[0].data.push(dstaff.point);
            });
            staffChart=<Pie data={staffsData} options={chartConfig} />;
        }
        if(user.dimension.dcv&&user.dimension.dcv.length>0){
            let cvsData={
                labels:[],
                datasets:[
                    {
                        label:'声优TOP10',
                        borderWidth: 0,
                        data: []
                    }
                ]
            };
            cvsData.datasets[0].backgroundColor=chartColors.slice(0,user.dimension.dcv.length);
            user.dimension.dcv.forEach(function(dcv){
                cvsData.labels.push(dcv.name);
                cvsData.datasets[0].data.push(dcv.point);
            });
            cvChart=<Pie data={cvsData} options={chartConfig} />;
        }
        return (
            <div className="app-analytics app-column">
                <div className="app-block app-block-round app-column-item">
                    <div className="app-block-title">标签TOP10</div>
                    <div className="app-block-content">
                        {tagChart?tagChart:emptyChart}
                    </div>
                </div>
                <div className="app-block app-block-round app-column-item">
                    <div className="app-block-title">制作TOP10</div>
                    <div className="app-block-content">
                        {staffChart?staffChart:emptyChart}
                    </div>
                </div>
                <div className="app-block app-block-round app-column-item">
                    <div className="app-block-title">声优TOP10</div>
                    <div className="app-block-content">
                        {cvChart?cvChart:emptyChart}
                    </div>
                </div>
            </div>
        );
    }
    handleUpdateUserAnalytics(){
        const {routing,dispatch} = this.props;
        let params=getParams(routing);
        dispatch(getUserDimension(params.id));
    }
}
UserIndex.propTypes={
    user:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(UserIndex);