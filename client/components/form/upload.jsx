import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {upload} from '../../common/tool';
import {modalUpdate,modalClean} from '../../actions/modal';

//封装组件
class Upload extends Component {
    constructor(props) {
        super(props);
        this.handleChangeVal = this.handleChangeVal.bind(this);
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
            <div className="app-form-control app-form-upload">
                {labelContent}
                <div className="app-form-content">
                    <label className="btn btn-primary btn-round">
                        <i className="icon icon-image m-r-sm"></i>选择图片
                        <input type="file" ref="upload" onChange={this.handleChangeVal} accept=".jpg" />
                    </label>
                </div>
            </div>
        )
    }
    handleChangeVal(e){
        const {name,onChangeVal,dispatch} = this.props;
        let file=this.refs.upload.files[0];
        if(file){
            dispatch(modalUpdate({
                'loading':true
            }))
            upload(file).then(img=>{
                dispatch(modalClean('loading'));
                console.log(img);
            }).catch(err=>{
                dispatch(modalUpdate({
                    'loading':null,
                    'tip':err.message
                }))
            })
        }
    }
}

Upload.propTypes={
    name:PropTypes.string.isRequired,
    label:PropTypes.string,
    value:PropTypes.string,
    onChangeVal:PropTypes.func.isRequired
}

export default connect()(Upload);