import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getQuery,getEnumArray,getObjCompareResult} from '../../common/tool';
import {type,status} from '../../enums/anime_group';

import FormList from '../../components/form/index.jsx';

import {modalUpdate} from '../../actions/modal';
import {addAnimeGroup,editAnimeGroup,getAnimeGroupDetail,cleanAnimeGroup} from '../../actions/anime_group';

function propMap(state,ownProps){
    return {
        animeGroupDetail:state.animeGroup.detail,
        routing:ownProps
    }
}

const TYPE_ARRAY = getEnumArray(type);
const STATUS_ARRAY = getEnumArray(status);

const FORM_RULE=[
    {
        name:'type',
        label:'剧集来源',
        type:'radio',
        list:TYPE_ARRAY
    },
    {
        name:'episodeTotal',
        label:'分集数',
        placeholder:'填写总的分集数量.如果未知,请填0',
        type:'text'
    },
    {
        label:'提交',
        type:'submit',
        icon:'confirm'
    }
]
const FORM_RULE_EDIT=[
    {
        name:'status',
        label:'剧集状态',
        type:'radio',
        list:STATUS_ARRAY
    }
]

//封装组件
class animeGroupEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            formRule:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        const {routing,dispatch} = this.props;
        let query=getQuery(routing);
        if(query.id){
            dispatch(getAnimeGroupDetail(query));
        }else{
            let newFormRule=FORM_RULE.map(rule=>{
                return Object.assign({},rule)
            })
            this.setState({
                formRule:newFormRule
            });
        }
    }
    componentDidUpdate(prevProps, prevState){
        const {animeGroupDetail,routing} = this.props;
        const {formRule} = this.state;
        let query=getQuery(routing);
        if(formRule.length===0){
            //查询缓存数据为空时重组数据
            if(formRule.length===0&&query.id&&animeGroupDetail._id){
                let newFormRule=FORM_RULE.map(rule=>{
                    switch(rule.name){
                        case 'type':
                            return Object.assign({},rule,{
                                value:animeGroupDetail['type'],
                                disabled:true
                            })
                            break;
                        case 'episodeTotal':
                            return Object.assign({},rule,{
                                value:animeGroupDetail['episode_total']
                            })
                            break;
                        default:
                            if(rule.name){
                                return Object.assign({},rule,{
                                    value:animeGroupDetail[rule.name]
                                })
                            }
                            return Object.assign({},rule);
                    }
                });
                let newFormRuleEdit=FORM_RULE_EDIT.map((rule)=>{
                    if(rule.name){
                        return Object.assign({},rule,{
                            value:animeGroupDetail[rule.name]
                        })
                    }
                    return Object.assign({},rule);
                })
                let resultFormRule=[].concat(newFormRule.slice(0,newFormRule.length-1),newFormRuleEdit,newFormRule.slice(newFormRule.length-1));
                this.setState({
                    formRule:resultFormRule
                });
            }
        }
    }
    componentWillUnmount(){
        const {routing,dispatch} = this.props;
        let query=getQuery(routing);
        if(query.id){
            dispatch(cleanAnimeGroup());
        }
    }
    render() {
        const {routing} = this.props;
        const {formRule} = this.state;
        if(formRule.length===0) return null;
        return (
            <div className="app-anime-edit m">
                <div className="app-notice m-b">
                    <h2>注意事项</h2>
                    <ol className="app-list app-list-order">
                        <li>所有的动画剧集信息均由本站用户添加维护,将会记录并显示创建人信息.</li>
                        <li>添加后管理员才可修改信息,如果有问题请联系管理员.</li>
                    </ol>
                </div>
                <FormList rules={formRule} longlabel={true} onSubmit={this.handleSubmit} />
            </div>
        )
    }
    handleSubmit(data){
        const {animeGroupDetail,routing,dispatch} = this.props;
        if(!data.type){
            dispatch(modalUpdate({
                tip:'请选择剧集来源'
            }));
            return;
        }
        if(!(parseInt(data.episodeTotal)>=0)){
            dispatch(modalUpdate({
                tip:'请输入有效的分集数量'
            }));
            return;
        }
        let sendData=Object.assign({},data);
        //检测是否为编辑
        if(animeGroupDetail._id){
            let compareData=getObjCompareResult(sendData,animeGroupDetail);
            if(compareData){
                dispatch(editAnimeGroup(Object.assign({},compareData,{
                    id:animeGroupDetail._id
                })));
            }else{
                dispatch(modalUpdate({
                    tip:'你还没有更改任何内容'
                }))
            }
        }
        else{
            let query=getQuery(routing);
            sendData.animeId=query.animeId;
            dispatch(addAnimeGroup(sendData));
        }
    }
}
export default connect(propMap)(animeGroupEdit);