import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isEmail} from 'validator';
import {clientPath} from '../../config';
import {getQuery} from '../../common/tool';

import FormList from '../../components/form/index.jsx';

import {modalUpdate} from '../../actions/modal';
import {userResetPwd} from '../../actions/user';

function propMap(state,ownProps){
    return {
        routing:ownProps
    }
}

const FORM_RULE = [
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
        label:'确认修改',
        type:'submit',
        icon:'confirm'
    }
]

//封装组件
class Getpwd extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <div className="app-common-form m">
                <FormList rules={FORM_RULE} longlabel={true} onSubmit={this.handleSubmit} />
                <div className="form-link text-right">
                    <Link to={clientPath+'/common/'}>返回登录</Link>
                </div>
            </div>
        )
    }
    handleSubmit(data){
        const {routing,dispatch} = this.props;
        let query=getQuery(routing);
        if(!query.token){
            dispatch(modalUpdate({
                tip:'无效的token'
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
        let sendData=Object.assign({},data);
        sendData.token=query.token;
        dispatch(userResetPwd(sendData));
    }
}

export default connect(propMap)(Getpwd);