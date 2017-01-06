import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getQuery,getEnumArray} from '../../common/tool';
import {showStatus} from '../../enums/anime';

import FormList from '../../components/form/index.jsx';

function propMap(state){
    return {
        routing:state.routing
    }
}

const SHOW_STATUS_ARRAY = getEnumArray(showStatus);

//封装组件
class animeEdit extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        const {routing} = this.props;
        let query=getQuery(routing);
        let formRule=[
            {
                name:'name',
                label:'中文名称',
                value:query.name,
                type:'text',
                placeholder:'请输入动画中文名称'
            },
            {
                name:'alias',
                label:'动画别名',
                type:'text',
                placeholder:'请输入动画别名'
            },
            {
                name:'desc',
                label:'动画介绍',
                type:'textarea',
                placeholder:'请输入动画介绍'
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
        return (
            <div className="app-anime-edit m">
                <FormList rules={formRule} longlabel={true} onSubmit={this.handleSubmit} />
            </div>
        )
    }
    handleSubmit(data){
        console.log(data);
    }
}
export default connect(propMap)(animeEdit);