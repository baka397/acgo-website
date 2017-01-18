import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getObjCompareResult} from '../../common/tool';

import FormList from '../../components/form/index.jsx';

import {modalUpdate} from '../../actions/modal';
import {userChangeProfile} from '../../actions/user';

const FORM_RULE = [
    {
        name:'nickname',
        type:'text',
        label:'昵称',
        placeholder:'请输入昵称'
    },
    {
        label:'修改资料',
        type:'submit',
        icon:'edit'
    }
]

function propMap(state){
    return {
        user:state.user
    }
}

//封装组件
class ConfigProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            formRule:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        const {user} = this.props;
        let formRule=FORM_RULE.map((rule)=>{
            switch(rule.name){
                default:
                    if(rule.name){
                        return Object.assign({},rule,{
                            value:user[rule.name]
                        })
                    }
                    return Object.assign({},rule);
            }
        })
        this.setState({
            formRule
        })
    }
    render() {
        const {formRule} = this.state;
        if(formRule.length===0) return null;
        return (
            <div className="app-config-password">
                <FormList rules={formRule} longlabel={true} onSubmit={this.handleSubmit} />
            </div>
        )
    }
    handleSubmit(data){
        const {user,dispatch} = this.props;
        if(!data.nickname){
            dispatch(modalUpdate({
                tip:'请输入昵称'
            }));
            return;
        }
        let compareData=getObjCompareResult(data,user);
        if(compareData){
            dispatch(userChangeProfile(compareData));
        }else{
            dispatch(modalUpdate({
                tip:'你还没有更改任何内容'
            }))
        }
    }
}

export default connect(propMap)(ConfigProfile);