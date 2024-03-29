import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isEmail,isMongoId} from 'validator';
import {clientPath} from '../../config';
import {windowChange} from '../../common/ipc';

import FormList from '../../components/form/index.jsx';

import {modalUpdate} from '../../actions/modal';
import {profileReg} from '../../actions/profile';

const FORM_RULE = [
    {
        name:'email',
        type:'text',
        label:'邮箱',
        placeholder:'请输入邮箱'
    },
    {
        name:'code',
        type:'text',
        label:'邀请码',
        placeholder:'请输入邀请码'
    },
    {
        name:'nickname',
        type:'text',
        label:'昵称',
        placeholder:'请输入昵称'
    },
    {
        name:'password',
        type:'password',
        label:'密码',
        placeholder:'请输入密码'
    },
    {
        name:'confirmPassword',
        type:'password',
        label:'确认密码',
        placeholder:'请再次输入密码'
    },
    {
        label:'注册',
        type:'submit',
        icon:'confirm'
    }
];

//封装组件
class Register extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        windowChange('common',440);
    }
    render() {
        return (
            <div className="app-common-form m">
                <FormList rules={FORM_RULE} onSubmit={this.handleSubmit} longlabel={true} />
                <div className="form-link text-right">
                    <Link to={clientPath+'/common/'}>已有账号,立即登录</Link>
                </div>
            </div>
        );
    }
    handleSubmit(data){
        const {dispatch} = this.props;
        if(!data.email||!isEmail(data.email)){
            dispatch(modalUpdate({
                tip:'请输入正确的邮箱'
            }));
            return;
        }
        if(!data.code||!isMongoId(data.code)){
            dispatch(modalUpdate({
                tip:'请输入正确的邀请码'
            }));
            return;
        }
        if(!data.nickname){
            dispatch(modalUpdate({
                tip:'请输入正确的昵称'
            }));
            return;
        }
        if(!data.password){
            dispatch(modalUpdate({
                tip:'请输入正确的密码'
            }));
            return;
        }
        if(!data.confirmPassword){
            dispatch(modalUpdate({
                tip:'请输入正确的确认密码'
            }));
            return;
        }
        if(data.password!==data.confirmPassword){
            dispatch(modalUpdate({
                tip:'两次密码不一致'
            }));
            return;
        }
        dispatch(profileReg(data));
    }
}

Register.propTypes={
    dispatch:PropTypes.func.isRequired
};

export default connect()(Register);