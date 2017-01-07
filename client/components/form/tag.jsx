import React, {PropTypes,Component} from 'react';
import Select from 'react-select';
import {fetch} from '../../common/api';
import {nextPromise} from '../../common/tool';

function promptTextCreator(label){
    return '找不到'+label+',立即创建一个';
}

//封装组件
class Tag extends Component {
    constructor(props) {
        super(props);
        this.handleChangeVal = this.handleChangeVal.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {value} = this.props;
        if(value===nextProps.value) return false;
        return true;
    }
    render() {
        const {name,label,placeholder,value} = this.props;
        let labelContent;
        if(label) labelContent=<div className="app-form-label">{label}</div>;
        return (
            <label className="app-form-control app-form-tag">
                {labelContent}
                <div className="app-form-content">
                    <Select.AsyncCreatable multi={true} name={name} autoload={false} valueKey="_id" labelKey="name" value={value} placeholder={placeholder} noResultsText="请输入搜索信息" promptTextCreator={promptTextCreator} loadOptions={this.handleInput} onChange={this.handleChangeVal} />
                </div>
            </label>
        )
    }
    handleChangeVal(val){
        const {name,onChangeVal} = this.props;
        if(val.className==='Select-create-option-placeholder'){
        }else{
        }
    }
    handleInput(input){
        const {tagType} = this.props;
        if (!input) {
            return nextPromise(null,[]);
        }
        return fetch('tag',{
            type:tagType,
            keyword:input
        }).then(data=>{
            return nextPromise(null,{
                options: data.data.content
            })
        })
    }
}

Tag.propTypes={
    name:PropTypes.string.isRequired,
    label:PropTypes.string,
    placeholder:PropTypes.string,
    value:PropTypes.string,
    tagType:PropTypes.number.isRequired,
    onChangeVal:PropTypes.func.isRequired
}

export default Tag;