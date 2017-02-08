import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isEmail} from 'validator';
import {clientPath} from '../../config';
import {windowChange} from '../../common/ipc';

import FormList from '../../components/form/index.jsx';

import {modalUpdate} from '../../actions/modal';
import {userSendMail} from '../../actions/user';

const FORM_RULE = [
    {
        name:'email',
        type:'text',
        label:'注册邮箱',
        placeholder:'请输入邮箱'
    },
    {
        label:'发送邮件',
        type:'submit',
        icon:'confirm'
    }
];

//封装组件
class Getpwd extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        windowChange('common',200);
    }
    render() {
        return (
            <div className="app-common-form m">
                <FormList rules={FORM_RULE} longlabel={true} onSubmit={this.handleSubmit} />
                <div className="form-link text-right">
                    <Link to={clientPath+'/common/'}>返回登录</Link>
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
        dispatch(userSendMail(data));
    }
}

Getpwd.propTypes={
    dispatch:PropTypes.func.isRequired
};

export default connect()(Getpwd);