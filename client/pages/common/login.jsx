import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isEmail} from 'validator';
import {clientPath} from '../../config';
import {windowChange} from '../../common/ipc';

import FormList from '../../components/form/index.jsx';

import {modalUpdate} from '../../actions/modal';
import {userLogin} from '../../actions/user';

const FORM_RULE = [
    {
        name:'email',
        type:'text',
        label:'邮箱',
        placeholder:'请输入邮箱'
    },
    {
        name:'password',
        type:'password',
        label:'密码',
        placeholder:'请输入密码'
    },
    {
        label:'登录',
        type:'submit',
        icon:'confirm'
    }
]

//封装组件
class Login extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        windowChange('common',260);
    }
    render() {
        return (
            <div className="app-common-form m">
                <FormList rules={FORM_RULE} onSubmit={this.handleSubmit} />
                <div className="form-link text-right">
                    <Link to={clientPath+'/common/register/'}>邀请码注册</Link>
                    <Link to={clientPath+'/common/getpwd/'} className="m-l">忘记密码</Link>
                </div>
            </div>
        )
    }
    handleSubmit(data){
        const {dispatch} = this.props;
        if(!data.email||!isEmail(data.email)){
            dispatch(modalUpdate({
                tip:'请输入正确的邮箱'
            }));
            return;
        }
        if(!data.password){
            dispatch(modalUpdate({
                tip:'请输入正确的密码'
            }))
            return;
        }
        dispatch(userLogin(data));
    }
}

export default connect()(Login);