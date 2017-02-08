import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {AsyncCreatable} from 'react-select';
import {isMongoId} from 'validator';
import {fetch} from '../../common/api';
import {nextPromise} from '../../common/tool';
import {searchDelay} from '../../config';

import {modalUpdate,modalClean} from '../../actions/modal';

let timer;

//封装组件
class Tag extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:[]
        };
        this.handleChangeVal = this.handleChangeVal.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handlePromptTextCreator = this.handlePromptTextCreator.bind(this);
    }
    componentWillMount(){
        const {value,tagType,dispatch} = this.props;
        if(value){
            dispatch(modalUpdate({
                loading:true
            }));
            fetch('tag',{
                ids:value,
                type:tagType
            }).then(res=>{
                dispatch(modalClean('loading'));
                let values=[];
                res.data.content.forEach(option=>{
                    values.push({
                        _id:option._id,
                        name:option.name
                    });
                });
                this.setState({
                    value:values
                });
            }).catch(()=>{
                dispatch(modalClean('loading'));
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        const {value} = this.state;
        if(value.length===nextState.value.length) return false;
        return true;
    }
    render() {
        const {name,label,placeholder} = this.props;
        const {value} = this.state;
        let labelContent;
        if(label) labelContent=<div className="app-form-label">{label}</div>;
        return (
            <div className="app-form-control app-form-tag">
                {labelContent}
                <div className="app-form-content">
                    <AsyncCreatable name={name} value={value} autoload={false} cache={false} multi={true} valueKey="_id" labelKey="name" placeholder={placeholder} noResultsText="输入搜索内容" promptTextCreator={this.handlePromptTextCreator} clearAllText="清空" loadOptions={this.handleInput} onChange={this.handleChangeVal} />
                </div>
            </div>
        );
    }
    handlePromptTextCreator(label){
        return '没有符合"'+label+'"的数据?立即创建一个';
    }
    handleChangeVal(val){
        const {maxSize,tagType,dispatch} = this.props;
        let addName='';
        let values=[];
        if(val.length>maxSize) return dispatch(modalUpdate({
            tip:'最多只能选择'+maxSize+'项'
        }));
        val.forEach(function(option){
            if(isMongoId(option._id)){
                values.push({
                    _id:option._id,
                    name:option.name
                });
            }else{
                addName=option.name;
            }
        });
        if(addName){
            dispatch(modalUpdate({
                loading:true
            }));
            fetch('tagAdd',{
                name:addName,
                type:tagType
            },'POST').then(res=>{
                dispatch(modalUpdate({
                    loading:null,
                    data:res.msg
                }));
                values.push({
                    _id:res.data._id,
                    name:res.data.name
                });
                this.handleUpdateVal(values);
            }).catch(err=>{
                dispatch(modalUpdate({
                    loading:null,
                    tip:err.message
                }));
            });
        }else{
            this.handleUpdateVal(values);
        }
    }
    handleUpdateVal(values){
        const {name,onChangeVal} = this.props;
        let changeValue=[];
        values.forEach((option)=>{
            changeValue.push(option._id);
        });
        onChangeVal(name,changeValue.toString());
        this.setState({
            value:values
        });
    }
    handleInput(input,callback){
        const {tagType} = this.props;
        if (!input) {
            return nextPromise(null,[]);
        }
        if(timer) clearTimeout(timer);
        timer=setTimeout(function(){
            fetch('tag',{
                type:tagType,
                keyword:input
            }).then(res=>{
                callback(null,{
                    options: res.data.content,
                    complete: true
                });
            }).catch((err)=>{
                callback(err);
            });
        },searchDelay*1000);
    }
}

Tag.propTypes={
    name:PropTypes.string.isRequired,
    label:PropTypes.string,
    placeholder:PropTypes.string,
    value:PropTypes.string,
    tagType:PropTypes.number.isRequired,
    maxSize:PropTypes.number.isRequired,
    onChangeVal:PropTypes.func.isRequired,
    dispatch:PropTypes.func.isRequired
};

export default connect()(Tag);