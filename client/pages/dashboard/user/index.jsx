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
    constructor(props){
        super(props);
    }
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
        if(user.dimension.dtag){
            tagsData.datasets[0].backgroundColor=chartColors.slice(0,user.dimension.dtag.length);
            user.dimension.dtag.forEach(function(dtag){
                tagsData.labels.push(dtag.name);
                tagsData.datasets[0].data.push(dtag.point);
            });
        }
        if(user.dimension.dstaff){
            staffsData.datasets[0].backgroundColor=chartColors.slice(0,user.dimension.dstaff.length);
            user.dimension.dstaff.forEach(function(dstaff){
                staffsData.labels.push(dstaff.name);
                staffsData.datasets[0].data.push(dstaff.point);
            });
        }
        if(user.dimension.dcv){
            cvsData.datasets[0].backgroundColor=chartColors.slice(0,user.dimension.dcv.length);
            user.dimension.dcv.forEach(function(dcv){
                cvsData.labels.push(dcv.name);
                cvsData.datasets[0].data.push(dcv.point);
            });
        }
        return (
            <div className="app-analytics">
                <div className="app-block app-block-round">
                    <div className="app-block-title">标签TOP10</div>
                    <div className="app-block-content">
                        <Pie data={tagsData} options={chartConfig} />
                    </div>
                </div>
                <div className="app-block app-block-round">
                    <div className="app-block-title">制作TOP10</div>
                    <div className="app-block-content">
                        <Pie data={staffsData} options={chartConfig} />
                    </div>
                </div>
                <div className="app-block app-block-round">
                    <div className="app-block-title">声优TOP10</div>
                    <div className="app-block-content">
                        <Pie data={cvsData} options={chartConfig} />
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