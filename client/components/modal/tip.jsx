import React, {PropTypes,Component} from 'react';

//封装组件
class Tip extends Component {
    constructor(props){
        super(props);
        this.handleHide = this.handleHide.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        const { tip } = this.props;
        if(tip===nextProps.tip) return false;
        return true;
    }
    render() {
        const { tip } = this.props;
        if(!tip) return null;
        return (
            <div className="app-modal-sub modal-tip">
                <div className="modal-content">
                    <div className="modal-body">
                        {tip}
                    </div>
                    <div className="modal-footer">
                        <a className="btn btn-info btn-block" onClick={this.handleHide}>我知道了</a>
                    </div>
                </div>
                <div className="modal-mask" onClick={this.handleHide}></div>
            </div>
        )
    }
    handleHide(){
        const { onHide } = this.props;
        onHide('tip');
    }
}

Tip.propTypes={
    tip:PropTypes.string,
    onHide:PropTypes.func.isRequired
}

export default Tip;