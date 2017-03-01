import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {getQuery,getObjCompareResult,isObjEmpty} from '../../../common/tool';
import {typeTip} from '../../../enums/anime_group';

import FormList from '../../../components/form/index.jsx';

import {modalUpdate} from '../../../actions/modal';
import {getAnimeGroupDetail,cleanAnimeGroup} from '../../../actions/anime_group';
import {addAnimeItem,editAnimeItem,getAnimeItemDetail,cleanAnimeItem} from '../../../actions/anime_item';

function propMap(state,ownProps){
    return {
        animeItemDetail:state.animeItem.detail,
        animeGroupDetail:state.animeGroup.detail,
        routing:ownProps
    };
}

const FORM_RULE=[
    {
        name:'episodeName',
        label:'分集名称',
        placeholder:'填写分集名称',
        type:'text'
    },
    {
        name:'episodeNo',
        label:'分集集数',
        placeholder:'填写分集集数,最小为1.',
        type:'text'
    },
    {
        name:'url',
        label:'分集地址',
        placeholder:'填写分集地址.',
        type:'text'
    },
    {
        label:'提交',
        type:'submit',
        icon:'confirm'
    }
];

//封装组件
class animeGroupItemEdit extends Component {
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
        }else if(query.id){
            dispatch(getAnimeItemDetail({
                id:query.id
            }));
        }
    }
    componentDidUpdate(){
        const {animeItemDetail,animeGroupDetail,routing,dispatch} = this.props;
        const {formRule} = this.state;
        let query=getQuery(routing);
        //当为编辑时
        if(animeItemDetail._id&&isObjEmpty(animeGroupDetail)){
            return dispatch(getAnimeGroupDetail({
                id:animeItemDetail.group_id
            }));
        }
        if(formRule.length===0&&animeGroupDetail._id){
            let newFormRule=FORM_RULE.map(rule=>{
                switch(rule.name){
                case 'url':
                    return Object.assign({},rule,{
                        placeholder:rule.placeholder+'支持形式:'+typeTip[animeGroupDetail.type].item
                    });
                default:
                    return Object.assign({},rule);
                }
            });
            //如果为编辑
            if(query.id){
                newFormRule=newFormRule.map(rule=>{
                    switch(rule.name){
                    case 'episodeNo':
                        return Object.assign({},rule,{
                            value:animeItemDetail.episode_no
                        });
                    case 'episodeName':
                        return Object.assign({},rule,{
                            value:animeItemDetail.episode_name
                        });
                    default:
                        if(rule.name){
                            return Object.assign({},rule,{
                                value:animeItemDetail[rule.name]
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
        const {routing,dispatch} = this.props;
        let query=getQuery(routing);
        if(query.id){
            dispatch(cleanAnimeItem());
        }
        dispatch(cleanAnimeGroup());
    }
    render() {
        const {formRule} = this.state;
        if(formRule.length===0) return null;
        return (
            <div className="app-anime-edit m">
                <div className="app-notice m-b">
                    <h2>注意事项</h2>
                    <ol className="app-list app-list-order">
                        <li>所有的动画剧集分集信息均由本站用户添加维护,将会记录并显示创建人信息.</li>
                        <li>添加后管理员才可修改信息,如果有问题请联系管理员.</li>
                    </ol>
                </div>
                <FormList rules={formRule} longlabel={true} onSubmit={this.handleSubmit} />
            </div>
        );
    }
    handleSubmit(data){
        const {animeItemDetail,routing,dispatch} = this.props;
        if(!data.episodeName){
            dispatch(modalUpdate({
                tip:'请填写分集名称'
            }));
            return;
        }
        if(!(parseInt(data.episodeNo)>0)){
            dispatch(modalUpdate({
                tip:'请填写有效的分集集数'
            }));
            return;
        }
        if(!data.url){
            dispatch(modalUpdate({
                tip:'请填写分集地址'
            }));
            return;
        }
        let sendData=Object.assign({},data);
        //检测是否为编辑
        if(animeItemDetail._id){
            let compareData=getObjCompareResult(sendData,animeItemDetail);
            if(compareData){
                dispatch(editAnimeItem(Object.assign({},compareData,{
                    id:animeItemDetail._id
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
            dispatch(addAnimeItem(sendData));
        }
    }
}
animeGroupItemEdit.propTypes={
    animeItemDetail:PropTypes.object.isRequired,
    animeGroupDetail:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(animeGroupItemEdit);