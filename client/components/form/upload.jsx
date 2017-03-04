import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {upload,getImageUrl,getSizeInfo} from '../../common/tool';
import {modalUpdate,modalClean} from '../../actions/modal';
import {coverCopperWidth,coverCopperHeight,avatarCopperWidth,avatarCopperHeight,acceptType,maxUploadSize} from '../../config';

import Cropper from 'react-cropper';

//封装组件
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:this.props.value?this.props.value.split('|'):[]
        };
        this.handleChangeVal = this.handleChangeVal.bind(this);
        this.handleCropper = this.handleCropper.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCropperEdit = this.handleCropperEdit.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {value} = this.state;
        if(value.toString()===nextState.value.toString()) return false;
        return true;
    }
    render() {
        const {label,cropperType} = this.props;
        const {value} = this.state;
        let labelContent,upload,cropper,imageInfo,cropperWidth,cropperHeight;
        switch(cropperType){
        case 'cover':
            cropperWidth=coverCopperWidth;
            cropperHeight=coverCopperHeight;
            break;
        case 'avatar':
            cropperWidth=avatarCopperWidth;
            cropperHeight=avatarCopperHeight;
            break;
        default:
            return <p>无效的裁剪类型</p>;
        }
        if(label) labelContent=<div className="app-form-label">{label}</div>;
        //检测是否已经上传
        if(value[0]&&value[1]){
            imageInfo=(
                <div className="upload-info">
                    <p className="m-b">
                        <button type="button" className="btn btn-danger m-r" onClick={this.handleDelete}><i className="icon icon-reload m-r-sm"></i>重传图片</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleCropperEdit}><i className="icon icon-crop m-r-sm"></i>编辑裁剪</button>
                    </p>
                    <p><img src={getImageUrl(value[0],value[1],360)} /></p>
                </div>
            );
        }else if(value[0]){ //已经上传图片
            cropper=(
                <div className="upload-cropper">
                    <p className="m-b">
                        <button type="button" className="btn btn-primary" onClick={this.handleCropper}><i className="icon icon-crop m-r-sm"></i>确认裁剪</button>
                    </p>
                    <Cropper ref="cropper" src={getImageUrl(value[0])} style={{height: 360, width: 600}} viewMode={1} aspectRatio={cropperWidth/cropperHeight} autoCropArea={1} minCropBoxWidth={cropperWidth} minCropBoxHeight={cropperHeight} />
                </div>
            );
        }else{
            upload=(
                <div>
                    <label className="btn btn-primary m-r-sm">
                        <i className="icon icon-image m-r-sm"></i>选择图片
                        <input type="file" ref="upload" onChange={this.handleChangeVal} accept={acceptType} />
                    </label>
                    <p className="m-t text-light">支持{acceptType}类型上传,最大支持{getSizeInfo(maxUploadSize)},为保证显示质量尺寸建议大于{cropperWidth}px <i className="icon icon-close"></i> {cropperHeight}px</p>
                </div>
            );
        }
        return (
            <div className="app-form-control app-form-upload">
                {labelContent}
                <div className="app-form-content">
                    {cropper}
                    {imageInfo}
                    {upload}
                </div>
            </div>
        );
    }
    handleChangeVal(){
        const {dispatch} = this.props;
        let file=this.refs.upload.files[0];
        if(file){
            dispatch(modalUpdate({
                'loading':true
            }));
            upload(file).then(img=>{
                dispatch(modalClean('loading'));
                let curValue=[img,''];
                this.setState({
                    value:curValue
                });
            }).catch(err=>{
                dispatch(modalUpdate({
                    'loading':null,
                    'tip':err.message
                }));
            });
        }
    }
    handleCropper(){
        const {name,onChangeVal} = this.props;
        const {value} = this.state;
        let cropData=this.refs.cropper.getData();
        let cropValue=[value[0]];
        let cropArray=[parseInt(cropData.x),parseInt(cropData.y),parseInt(cropData.width),parseInt(cropData.height)];
        cropValue.push(cropArray.join(','));
        this.setState({
            value:cropValue
        });
        onChangeVal(name,cropValue.join('|'));
    }
    handleCropperEdit(){
        const {value} = this.state;
        let cropValue=[value[0]];
        this.setState({
            value:cropValue
        });
    }
    handleDelete(){
        const {name,onChangeVal} = this.props;
        this.setState({
            value:[]
        });
        onChangeVal(name,'');
    }
}

Upload.propTypes={
    name:PropTypes.string.isRequired,
    label:PropTypes.string,
    value:PropTypes.string,
    cropperType:PropTypes.oneOf(['avatar','cover']).isRequired,
    onChangeVal:PropTypes.func.isRequired,
    dispatch:PropTypes.func.isRequired
};

export default connect()(Upload);