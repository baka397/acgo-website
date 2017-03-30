import React, {PropTypes,Component} from 'react';

//封装组件
class Progress extends Component {
    render() {
        const {percent} = this.props;
        return (
            <div className="app-progress">
                <div className="complete" style={{width:(percent+'%')}}></div>
                <div className="tip">当前进度{percent}%</div>
            </div>
        );
    }
}

Progress.propTypes={
    percent:PropTypes.number.isRequired
};

export default Progress;