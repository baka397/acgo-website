import React, {PropTypes,Component} from 'react';

import Text from './text.jsx';
import Button from './button.jsx';

//封装组件
class FormSearch extends Component {
    constructor(props){
        super(props);
        this.state={
            result:{}
        }
        props.rules.forEach((rule)=>{
            if(rule.name){
                if(!/^[a-zA-Z0-9\_]+$/.test(rule.name)){
                    throw new Error('请输入正确的规则名称');
                }
                this.state.result[rule.name]=rule.value||'';
            }
        })
        this.handleChangeVal = this.handleChangeVal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        const {rules,longlabel} = this.props;
        const {result} = this.state;
        return (
            <form className="app-form app-form-search" onSubmit={this.handleSubmit}>
                {rules.map((rule,index)=>{
                    switch(rule.type){
                        case 'text':
                            return <Text key={index} value={result[rule.name]} name={rule.name} label={rule.label} placeholder={rule.placeholder} onChangeVal={this.handleChangeVal} />
                            break;
                        case 'submit':
                            return <Button key={index} label={rule.label} icon={rule.icon} />
                        default:
                            return null;
                    }
                })}
            </form>
        )
    }
    handleChangeVal(name,value){
        const {result} = this.state;
        let data = Object.assign({},result);
        data[name]=value;
        this.setState({
            result:data
        })
    }
    handleSubmit(e){
        e.preventDefault();
        const {onSubmit} = this.props;
        const {result} = this.state;
        onSubmit(result);
    }
}

FormSearch.propTypes={
    rules:PropTypes.array.isRequired,
    onSubmit:PropTypes.func.isRequired
}

export default FormSearch;