import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {getQuery,getEnumArray,getObjCompareResult} from '../../../common/tool';
import {taskPeriod,taskStatus,typeTip} from '../../../enums/anime_group';

import FormList from '../../../components/form/index.jsx';

import {modalUpdate} from '../../../actions/modal';
import {getAnimeGroupDetail,cleanAnimeGroup} from '../../../actions/anime_group';
import {getAnimeTaskDetail,editAnimeTask,addAnimeTask,cleanAnimeTask} from '../../../actions/anime_task';


function propMap(state,ownProps){
    return {
        animeTaskDetail:state.animeTask.detail,
        animeGroupDetail:state.animeGroup.detail,
        routing:ownProps
    };
}

const TASK_PERIOD_ARRAY = getEnumArray(taskPeriod);
const TASK_STATUS_ARRAY = getEnumArray(taskStatus);

const FORM_RULE=[
    {
        name:'url',
        label:'抓取地址',
        placeholder:'填写抓取地址.',
        type:'text'
    },
    {
        name:'taskPeriod',
        label:'更新周期',
        type:'radio',
        list:TASK_PERIOD_ARRAY
    },
    {
        label:'提交',
        type:'submit',
        icon:'confirm'
    }
];
const FORM_RULE_EDIT=[
    {
        name:'taskStatus',
        label:'任务状态',
        type:'radio',
        list:TASK_STATUS_ARRAY
    }
];

//封装组件
class animeGroupTaskEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            formRule:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        const {routing,dispatch} = this.props;
        let query=getQuery(routing);
        if(query.groupId){
            dispatch(getAnimeGroupDetail({
                id:query.groupId
            }));
            dispatch(getAnimeTaskDetail({
                id:query.groupId
            }));
        }
    }
    componentDidUpdate(){
        const {animeTaskDetail,animeGroupDetail} = this.props;
        const {formRule} = this.state;
        if(formRule.length===0&&animeTaskDetail.done&&animeGroupDetail._id){
            let newFormRule=FORM_RULE.map(rule=>{
                switch(rule.name){
                case 'url':
                    return Object.assign({},rule,{
                        placeholder:rule.placeholder+'支持形式:'+typeTip[animeGroupDetail.type].task
                    });
                default:
                    return Object.assign({},rule);
                }
            });
            //如果为编辑
            if(animeTaskDetail._id){
                let resultFormRule=[].concat(newFormRule.slice(0,newFormRule.length-1),FORM_RULE_EDIT,newFormRule.slice(newFormRule.length-1));
                newFormRule=resultFormRule.map(rule=>{
                    switch(rule.name){
                    case 'taskPeriod':
                        return Object.assign({},rule,{
                            value:animeTaskDetail['task_period']
                        });
                    case 'taskStatus':
                        return Object.assign({},rule,{
                            value:animeTaskDetail['task_status']
                        });
                    default:
                        if(rule.name){
                            return Object.assign({},rule,{
                                value:animeTaskDetail[rule.name]
                            });
                        }
                        return Object.assign({},rule);
                    }
                });
            }
            this.setState({
                formRule:newFormRule
            });
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(cleanAnimeGroup());
        dispatch(cleanAnimeTask());
    }
    render() {
        const {formRule} = this.state;
        if(formRule.length===0) return null;
        return (
            <div className="app-anime-edit m">
                <div className="app-notice m-b">
                    <h2>注意事项</h2>
                    <ol className="app-list app-list-order">
                        <li>每个剧集只能添加一个计划任务,计划任务会根据更新周期进行自动更新.</li>
                    </ol>
                </div>
                <FormList rules={formRule} longlabel={true} onSubmit={this.handleSubmit} />
            </div>
        );
    }
    handleSubmit(data){
        const {animeTaskDetail,routing,dispatch} = this.props;
        if(!data.url){
            dispatch(modalUpdate({
                tip:'请填写抓取地址'
            }));
            return;
        }
        if(!data.taskPeriod){
            dispatch(modalUpdate({
                tip:'请选择更新周期'
            }));
            return;
        }
        let sendData=Object.assign({},data);
        //检测是否为编辑
        if(animeTaskDetail._id){
            let compareData=getObjCompareResult(sendData,animeTaskDetail);
            if(compareData){
                dispatch(editAnimeTask(Object.assign({},compareData,{
                    id:animeTaskDetail._id
                })));
            }else{
                dispatch(modalUpdate({
                    tip:'你还没有更改任何内容'
                }));
            }
        }
        else{
            let query=getQuery(routing);
            sendData.groupId=query.groupId;
            dispatch(addAnimeTask(sendData));
        }
    }
}

animeGroupTaskEdit.propTypes={
    animeTaskDetail:PropTypes.object.isRequired,
    animeGroupDetail:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(animeGroupTaskEdit);