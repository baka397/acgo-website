import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authLoginStatus } from '../actions/auth';
import { isObjEmpty } from '../common/tool';
import FormList from '../components/form/index.jsx';
import {Link} from 'react-router';
import {isEmail} from 'validator';

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
        type:'submit'
    }
]

function propMap(state){
    return {
        user:state.user
    }
}

//封装组件
class Home extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        const { user, dispatch } = this.props;
        dispatch(authLoginStatus(user,false));
    }
    render() {
        if(!isObjEmpty(user)){
            return null;
        }
        return (
            <div className="app-login">
                <FormList rules={FORM_RULE} onSubmit={this.handleSubmit} />
                <div className="app-login-link text-right">
                    <Link to="/client/common/register">邀请码注册</Link>
                    <Link to="/client/common/getpwd" className="m-l">忘记密码</Link>
                </div>
            </div>
        )
    }
    handleSubmit(data){
        if(!isEmail(data.email)){
            alert('请输入正确的邮箱');
        }
    }
}

export default connect(propMap)(Home);