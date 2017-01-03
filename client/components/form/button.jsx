import React, {PropTypes,Component} from 'react';

//封装组件
class Text extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
    render() {
        const { label } = this.props;
        return (
            <div className="app-form-footer">
                <button type="submit" className="btn btn-info btn-lg btn-round">{label}</button>
            </div>
        )
    }
}

Text.propTypes={
    label:PropTypes.string.isRequired
}

export default Text;