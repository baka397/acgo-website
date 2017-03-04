import React, {PropTypes,Component} from 'react';

import TimelineTip from './timeline.jsx';
import SubTip from './sub.jsx';
import AnalyticsTip from './analytics.jsx';

//封装组件
class Tip extends Component {
    shouldComponentUpdate(nextProps){
        const {type} = this.props;
        if(type===nextProps.type) return false;
        return true;
    }
    render() {
        const {type} = this.props;
        switch(type){
        case 'timeline':
            return <TimelineTip />;
        case 'sub':
            return <SubTip />;
        case 'analytics':
            return <AnalyticsTip />;
        default:
            return null;
        }
    }
}


Tip.propTypes={
    type: PropTypes.oneOf(['timeline','sub','analytics']).isRequired
};

export default Tip;