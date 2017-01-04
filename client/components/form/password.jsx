import React, {PropTypes,Component} from 'react';

//封装组件
class Password extends Component {
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
        return (
            <label className="app-form-control">
                <div className="app-form-label">{label}</div>
                <div className="app-form-content">
                    <input type="password" placeholder={placeholder} value={value} onChange={this.handleChangeVal} ref="text" />
                </div>
            </label>
        )
    }
    handleChangeVal(e){
        const {name,onChangeVal} = this.props;
        onChangeVal(name,this.refs.text.value);
    }
}

Password.propTypes={
    name:PropTypes.string.isRequired,
    label:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string,
    onChangeVal:PropTypes.func.isRequired
}

export default Password;