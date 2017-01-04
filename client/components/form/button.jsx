import React, {PropTypes,Component} from 'react';

//封装组件
class Text extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
    render() {
        const {label,icon} = this.props;
        let iconInfo=null;
        if(icon){
            iconInfo=<i className={'m-r-sm icon icon-'+icon}></i>
        }
        return (
            <div className="app-form-footer">
                <button type="submit" className="btn btn-info btn-lg btn-round">{iconInfo}{label}</button>
            </div>
        )
    }
}

Text.propTypes={
    label:PropTypes.string.isRequired,
    icon:PropTypes.string
}

export default Text;