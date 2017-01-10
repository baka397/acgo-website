import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getQuery,getEnumArray} from '../../common/tool';
import {showStatus} from '../../enums/anime';
import {type,typeMax} from '../../enums/tag';

import FormList from '../../components/form/index.jsx';

import {modalUpdate} from '../../actions/modal';
import {addAnime} from '../../actions/anime';

function propMap(state,ownProps){
    return {
        routing:ownProps
    }
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
        type:'upload'
    },
    {
        name:'tag',
        label:type[1],
        type:'tag',
        placeholder:'请选择'+type[1]+',最多选择'+typeMax[1]+'项',
        tagType:1,
        maxSize:typeMax[1]
    },
    {
        name:'staff',
        label:type[2],
        type:'tag',
        placeholder:'请选择'+type[2]+',最多选择'+typeMax[2]+'项',
        tagType:2,
        maxSize:typeMax[2]
    },
    {
        name:'cv',
        label:type[3],
        type:'tag',
        placeholder:'请选择'+type[3]+',最多选择'+typeMax[3]+'项',
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
]

//封装组件
class animeEdit extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        const {routing} = this.props;
        let query=getQuery(routing);
        let formRule=[];
        formRule=FORM_RULE.map(rule=>{
            if(rule.name==='name'){
                return Object.assign({},rule,{
                    value:query.name
                })
            }else{
                return Object.assign({},rule)
            }
        })
        return (
            <div className="app-anime-edit m">
                <div className="app-notice m-b">
                    <h2>注意事项</h2>
                    <ol className="app-list app-list-order">
                        <li>所有的动画信息均由本站用户添加,由社区管理员审核后展示.</li>
                        <li>在审核完成之前,用户可以预订阅该动画.</li>
                    </ol>
                </div>
                <FormList rules={formRule} longlabel={true} onSubmit={this.handleSubmit} />
            </div>
        )
    }
    handleSubmit(data){
        const {dispatch} = this.props;
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
        dispatch(addAnime(Object.assign({},data,{
            cover:coverArray[0],
            coverClip:coverArray[1]
        })));
    }
}
export default connect(propMap)(animeEdit);