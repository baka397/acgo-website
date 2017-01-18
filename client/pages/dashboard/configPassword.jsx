import React, {Component} from 'react';
import {connect} from 'react-redux';

import FormList from '../../components/form/index.jsx';

import {modalUpdate} from '../../actions/modal';
import {userChangePassword} from '../../actions/user';

const FORM_RULE = [
    {
        name:'oldPassword',
        type:'password',
        label:'密码',
        placeholder:'请输入旧密码'
    },
    {
        name:'password',
        type:'password',
        label:'密码',
        placeholder:'请输入新密码'
    },
    {
        name:'confirmPassword',
        type:'password',
        label:'确认密码',
        placeholder:'请再次输入密码'
    },
    {
        label:'修改密码',
        type:'submit',
        icon:'confirm'
    }
]

//封装组件
class ConfigPassword extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <div className="app-config-password">
                <FormList rules={FORM_RULE} longlabel={true} onSubmit={this.handleSubmit} />
            </div>
        )
    }
    handleSubmit(data){
        const {dispatch} = this.props;
        if(!data.oldPassword){
            dispatch(modalUpdate({
                tip:'请输入旧密码'
            }));
            return;
        }
        if(data.password===data.oldPassword){
            dispatch(modalUpdate({
                tip:'不能和旧密码一致'
            }))
            return;
        }
        if(!data.password){
            dispatch(modalUpdate({
                tip:'请输入新密码'
            }))
            return;
        }
        if(data.password!==data.confirmPassword){
            dispatch(modalUpdate({
                tip:'两次的密码不一致'
            }))
            return;
        }
        dispatch(userChangePassword(data));
    }
}

export default connect()(ConfigPassword);