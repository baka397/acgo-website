import React, {PropTypes,Component} from 'react';

//封装组件
class Button extends Component {
    shouldComponentUpdate(){
        return false;
    }
    render() {
        const {label,icon,disabled} = this.props;
        let iconInfo=null;
        if(icon){
            iconInfo=<i className={'m-r-sm icon icon-'+icon}></i>;
        }
        return (
            <div className="app-form-footer app-form-button">
                <button type="submit" className="btn btn-info" disabled={disabled}>{iconInfo}{label}</button>
            </div>
        );
    }
}

Button.propTypes={
    label:PropTypes.string.isRequired,
    icon:PropTypes.string,
    disabled:PropTypes.bool
};

export default Button;