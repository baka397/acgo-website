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
        const {name,label,placeholder,value} = this.props;
        let labelContent;
        if(label) labelContent=<div className="app-form-label">{label}</div>;
        return (
            <label className="app-form-control app-form-textarea">
                {labelContent}
                <div className="app-form-content">
                    <textarea placeholder={placeholder} onChange={this.handleChangeVal} ref="text" defaultValue={value} />
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
    onChangeVal:PropTypes.func.isRequired
}

export default Text;