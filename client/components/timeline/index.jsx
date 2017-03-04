import React, {PropTypes,Component} from 'react';

import TimelineItem from './item.jsx';
import Tip from '../tip/index.jsx';

//封装组件
class Timeline extends Component {
    render() {
        const {data,order} = this.props;
        return (
            <div className="app-timeline app-column">
                {
                    order.map(key=>{
                        return <TimelineItem key={key} data={data[key]} />;
                    })
                }
                {order.length===0?<Tip type="timeline" />:''}
            </div>
        );
    }
}


Timeline.propTypes={
    data: PropTypes.object.isRequired,
    order: PropTypes.array.isRequired
};

export default Timeline;