import React, {PropTypes,Component} from 'react';

import Text from './text.jsx';
import Password from './password.jsx';
import Button from './button.jsx';
import Textarea from './textarea.jsx';
import Radio from './radio.jsx';
import Upload from './upload.jsx';
import Tag from './tag.jsx';

//封装组件
class Form extends Component {
    constructor(props){
        super(props);
        let result={};
        props.rules.forEach((rule)=>{
            if(rule.name){
                if(!/^[a-zA-Z0-9\_]+$/.test(rule.name)){
                    throw new Error('请输入正确的规则名称');
                }
                if(isNaN(rule.value)){
                    result[rule.name]=rule.value||'';
                }else{
                    result[rule.name]=rule.value+'';
                }
            }
        });
        this.state={
            result
        };
        this.handleChangeVal = this.handleChangeVal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        const {rules,longlabel} = this.props;
        const {result} = this.state;
        return (
            <form className={longlabel?'app-form app-form-long':'app-form'} onSubmit={this.handleSubmit}>
                {rules.map((rule,index)=>{
                    switch(rule.type){
                    case 'text':
                        return <Text key={index} disabled={rule.disabled} value={result[rule.name]} name={rule.name} label={rule.label} placeholder={rule.placeholder} onChangeVal={this.handleChangeVal} />;
                    case 'password':
                        return <Password key={index} disabled={rule.disabled} value={result[rule.name]} name={rule.name} label={rule.label} placeholder={rule.placeholder} onChangeVal={this.handleChangeVal} />;
                    case 'textarea':
                        return <Textarea key={index} disabled={rule.disabled} value={result[rule.name]} name={rule.name} label={rule.label} placeholder={rule.placeholder} onChangeVal={this.handleChangeVal} />;
                    case 'upload':
                        return <Upload key={index} disabled={rule.disabled} value={result[rule.name]} name={rule.name} cropperType={rule.cropperType} label={rule.label} onChangeVal={this.handleChangeVal} />;
                    case 'radio':
                        return <Radio key={index} disabled={rule.disabled} value={result[rule.name]} name={rule.name} label={rule.label} list={rule.list} onChangeVal={this.handleChangeVal} />;
                    case 'tag':
                        return <Tag key={index} disabled={rule.disabled} value={result[rule.name]} name={rule.name} maxSize={rule.maxSize} label={rule.label} placeholder={rule.placeholder} tagType={rule.tagType} onChangeVal={this.handleChangeVal} />;
                    case 'submit':
                        return <Button key={index} disabled={rule.disabled} label={rule.label} icon={rule.icon} />;
                    default:
                        return null;
                    }
                })}
            </form>
        );
    }
    handleChangeVal(name,value){
        const {result} = this.state;
        let data = Object.assign({},result);
        data[name]=value;
        this.setState({
            result:data
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const {onSubmit} = this.props;
        const {result} = this.state;
        onSubmit(result);
    }
}

Form.propTypes={
    rules:PropTypes.array.isRequired,
    onSubmit:PropTypes.func.isRequired,
    longlabel:PropTypes.bool
};

export default Form;