import React, {PropTypes,Component} from 'react';

//封装组件
class Loading extends Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        const {status} = this.props;
        if(status===nextProps.status) return false;
        return true;
    }
    render() {
        const {status} = this.props;
        if(!status) return null;
        return (
            <div className="app-modal-sub modal-loading">
                <div className="modal-content">
                    <div className="app-spinner"></div>
                </div>
            </div>
        );
    }
}

Loading.propTypes={
    status:PropTypes.oneOfType([PropTypes.bool,PropTypes.string])
};

export default Loading;