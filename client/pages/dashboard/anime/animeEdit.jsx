import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {getQuery,getEnumArray,getObjCompareResult} from '../../../common/tool';
import {showStatus} from '../../../enums/anime';
import {type,typeMax,typeExample} from '../../../enums/tag';

import FormList from '../../../components/form/index.jsx';

import {modalUpdate} from '../../../actions/modal';
import {addAnime,editAnime,getAnimeDetail,cleanAnime} from '../../../actions/anime';

function propMap(state,ownProps){
    return {
        animeDetail:state.anime.detail,
        routing:ownProps
    };
}

const SHOW_STATUS_ARRAY = getEnumArray(showStatus);

const FORM_RULE=[
    {
        name:'name',
        label:'中文名称',
        type:'text',
        placeholder:'请输入动画中文名称'
    },
    {
        name:'alias',
        label:'动画别名',
        type:'text',
        placeholder:'请输入动画别名(日文名/英文名)'
    },
    {
        name:'desc',
        label:'动画介绍',
        type:'textarea',
        placeholder:'请输入动画介绍'
    },
    {
        name:'cover',
        label:'展示图',
        type:'upload',
        cropperType:'cover'
    },
    {
        name:'tag',
        label:type[1],
        type:'tag',
        placeholder:'请选择'+type[1]+','+typeExample[1]+'.最多选择'+typeMax[1]+'项',
        tagType:1,
        maxSize:typeMax[1]
    },
    {
        name:'staff',
        label:type[2],
        type:'tag',
        placeholder:'请选择'+type[2]+','+typeExample[2]+'.最多选择'+typeMax[2]+'项',
        tagType:2,
        maxSize:typeMax[2]
    },
    {
        name:'cv',
        label:type[3],
        type:'tag',
        placeholder:'请选择'+type[3]+','+typeExample[3]+'.最多选择'+typeMax[3]+'项',
        tagType:3,
        maxSize:typeMax[3]
    },
    {
        name:'showStatus',
        label:'连载状态',
        type:'radio',
        list:SHOW_STATUS_ARRAY
    },
    {
        label:'提交',
        type:'submit',
        icon:'confirm'
    }
];

//封装组件
class animeEdit extends Component {
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
        if(query.id){
            dispatch(getAnimeDetail(query));
        }else{
            let newFormRule=FORM_RULE.map(rule=>{
                if(rule.name==='name'){
                    return Object.assign({},rule,{
                        value:query.name
                    });
                }else{
                    return Object.assign({},rule);
                }
            });
            this.setState({
                formRule:newFormRule
            });
        }
    }
    componentDidUpdate(){
        const {animeDetail,routing} = this.props;
        const {formRule} = this.state;
        let query=getQuery(routing);
        if(formRule.length===0){
            //查询缓存数据为空时重组数据
            if(formRule.length===0&&query.id&&animeDetail._id){
                let newFormRule=FORM_RULE.map(rule=>{
                    switch(rule.name){
                    case 'name':
                        return Object.assign({},rule,{
                            value:animeDetail['name'],
                            disabled:true
                        });
                    case 'cover':
                        return Object.assign({},rule,{
                            value:animeDetail['cover']+'|'+animeDetail['cover_clip'].toString()
                        });
                    case 'tag':
                    case 'cv':
                    case 'staff':
                        return Object.assign({},rule,{
                            value:animeDetail[rule.name].toString()
                        });
                    case 'showStatus':
                        return Object.assign({},rule,{
                            value:animeDetail['show_status'].toString()
                        });
                    default:
                        if(rule.name){
                            return Object.assign({},rule,{
                                value:animeDetail[rule.name]
                            });
                        }
                        return Object.assign({},rule);
                    }
                });
                this.setState({
                    formRule:newFormRule
                });
            }
        }
    }
    componentWillUnmount(){
        const {routing,dispatch} = this.props;
        let query=getQuery(routing);
        if(query.id){
            dispatch(cleanAnime());
        }
    }
    render() {
        const {formRule} = this.state;
        if(formRule.length===0) return null;
        return (
            <div className="app-anime-edit m">
                <div className="app-notice m-b">
                    <h2>注意事项</h2>
                    <ol className="app-list app-list-order">
                        <li>所有的动画信息均由本站用户添加,由社区管理员审核后展示.</li>
                        <li>在审核完成之前,用户可以预订阅该动画.</li>
                        <li>所有编辑和审核记录将会记录并显示.</li>
                    </ol>
                </div>
                <FormList rules={formRule} longlabel={true} onSubmit={this.handleSubmit} />
            </div>
        );
    }
    handleSubmit(data){
        const {dispatch,animeDetail} = this.props;
        let coverArray=data.cover?data.cover.split('|'):[];
        if(!data.name){
            dispatch(modalUpdate({
                tip:'请输入动画中文名称'
            }));
            return;
        }
        if(!data.alias){
            dispatch(modalUpdate({
                tip:'请输入动画别名'
            }));
            return;
        }
        if(!data.desc){
            dispatch(modalUpdate({
                tip:'请输入动画介绍'
            }));
            return;
        }
        if(coverArray.length!==2||!coverArray[0]||!coverArray[1]){
            dispatch(modalUpdate({
                tip:'请上传正确的展示图'
            }));
            return;
        }
        if(!data.tag){
            dispatch(modalUpdate({
                tip:'请选择标签'
            }));
            return;
        }
        if(!data.staff){
            dispatch(modalUpdate({
                tip:'请选择制作人员'
            }));
            return;
        }
        if(!data.cv){
            dispatch(modalUpdate({
                tip:'请选择声优'
            }));
            return;
        }
        if(!data.showStatus){
            dispatch(modalUpdate({
                tip:'请选择连载状态'
            }));
            return;
        }
        let sendData=Object.assign({},data,{
            cover:coverArray[0],
            coverClip:coverArray[1]
        });
        //检测是否为编辑
        if(animeDetail._id){
            let compareData=getObjCompareResult(sendData,animeDetail);
            if(compareData){
                dispatch(editAnime(Object.assign({},compareData,{
                    id:animeDetail._id
                })));
            }else{
                dispatch(modalUpdate({
                    tip:'你还没有更改任何内容'
                }));
            }
        }
        else{
            dispatch(addAnime(sendData));
        }
    }
}

animeEdit.propTypes={
    animeDetail:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(animeEdit);