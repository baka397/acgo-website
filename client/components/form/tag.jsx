import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {modalUpdate,modalClean} from '../../actions/modal';
import Select from 'react-select';
import {isMongoId} from 'validator';

import {fetch} from '../../common/api';
import {nextPromise} from '../../common/tool';
import {searchDelay} from '../../config';

function promptTextCreator(label){
    return '找不到"'+label+'"?立即创建一个';
}
let timer;

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
            <div className="app-form-control app-form-tag">
                {labelContent}
                <div className="app-form-content">
                    <Select.AsyncCreatable name={name} autoload={false} cache={false} valueKey="_id" labelKey="name" value={value} placeholder={placeholder} noResultsText="输入搜索内容" promptTextCreator={promptTextCreator} clearAllText="清空" loadOptions={this.handleInput} onChange={this.handleChangeVal} />
                </div>
            </div>
        )
    }
    handleChangeVal(val){
        const {tagType,name,onChangeVal,dispatch} = this.props;
        if(!val){
            return onChangeVal(name,'');
        }
        if(isMongoId(val._id)){
            onChangeVal(name,val._id);
        }else{
            dispatch(modalUpdate({
                loading:true
            }))
            fetch('tagAdd',{
                name:val.name,
                type:tagType
            },'POST').then(data=>{
                dispatch(modalUpdate({
                    loading:null,
                    data:data.msg
                }))
            }).catch(err=>{
                dispatch(modalUpdate({
                    loading:null,
                    tip:err.message
                }))
            })
        }
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
            }).then(data=>{
                callback(null,{
                    options: data.data.content,
                    complete: true
                })
            }).catch((err)=>{
                callback(err);
            })
        },searchDelay*1000);
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

export default connect()(Tag);