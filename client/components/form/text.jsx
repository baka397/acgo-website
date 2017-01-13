import React, {PropTypes,Component} from 'react';

//封装组件
class Text extends Component {
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
        const {name,label,placeholder,value,disabled} = this.props;
        let labelContent;
        if(label) labelContent=<div className="app-form-label">{label}</div>;
        return (
            <label className="app-form-control app-form-text">
                {labelContent}
                <div className="app-form-content">
                    <input type="text" placeholder={placeholder} value={value} onChange={this.handleChangeVal} ref="text" disabled={disabled} />
                </div>
            </label>
        )
    }
    handleChangeVal(e){
        const {name,onChangeVal} = this.props;
        onChangeVal(name,this.refs.text.value);
    }
}

Text.propTypes={
    name:PropTypes.string.isRequired,
    label:PropTypes.string,
    placeholder:PropTypes.string,
    value:PropTypes.string,
    disabled:PropTypes.bool,
    onChangeVal:PropTypes.func.isRequired
}

export default Text;