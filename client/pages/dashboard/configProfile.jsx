import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {getObjCompareResult} from '../../common/tool';

import FormList from '../../components/form/index.jsx';

import {modalUpdate} from '../../actions/modal';
import {profileChangeProfile} from '../../actions/profile';

const FORM_RULE = [
    {
        name:'nickname',
        type:'text',
        label:'昵称',
        placeholder:'请输入昵称'
    },
    {
        name:'avatar',
        label:'头像',
        type:'upload',
        cropperType:'avatar'
    },
    {
        name:'desc',
        label:'个人介绍',
        type:'textarea',
        placeholder:'请输入个人介绍'
    },
    {
        label:'修改资料',
        type:'submit',
        icon:'edit'
    }
];

function propMap(state){
    return {
        profile:state.profile
    };
}

//封装组件
class ConfigProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            formRule:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        const {profile} = this.props;
        let formRule=FORM_RULE.map((rule)=>{
            switch(rule.name){
            case 'avatar':
                if(!profile['avatar']) return rule;
                return Object.assign({},rule,{
                    value:profile['avatar']+'|'+profile['avatar_clip'].toString()
                });
            default:
                if(rule.name){
                    return Object.assign({},rule,{
                        value:profile[rule.name]
                    });
                }
                return Object.assign({},rule);
            }
        });
        this.setState({
            formRule
        });
    }
    render() {
        const {formRule} = this.state;
        if(formRule.length===0) return null;
        return (
            <div className="app-config-password">
                <FormList rules={formRule} longlabel={true} onSubmit={this.handleSubmit} />
            </div>
        );
    }
    handleSubmit(data){
        const {profile,dispatch} = this.props;
        let avatarArray=data.avatar?data.avatar.split('|'):null;
        if(!data.nickname){
            dispatch(modalUpdate({
                tip:'请输入昵称'
            }));
            return;
        }
        if(avatarArray&&(avatarArray.length!==2||!avatarArray[0]||!avatarArray[1])){
            dispatch(modalUpdate({
                tip:'请上传正确的头像'
            }));
            return;
        }
        let sendData=Object.assign({},data,{
            avatar:avatarArray[0],
            avatarClip:avatarArray[1]
        });
        let compareData=getObjCompareResult(sendData,profile);
        if(compareData){
            dispatch(profileChangeProfile(compareData));
        }else{
            dispatch(modalUpdate({
                tip:'你还没有更改任何内容'
            }));
        }
    }
}

ConfigProfile.propTypes={
    profile:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};

export default connect(propMap)(ConfigProfile);