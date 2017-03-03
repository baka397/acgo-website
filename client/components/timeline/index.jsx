import React, {PropTypes,Component} from 'react';

import TimelineItem from './item.jsx';

//封装组件
class Timeline extends Component {
    render() {
        const {data,order,closeTip} = this.props;
        return (
            <div className="app-timeline app-column">
                {
                    order.map(key=>{
                        return <TimelineItem key={key} data={data[key]} />;
                    })
                }
                {order.length===0&&!closeTip?<div className="m-t m-b">暂无数据</div>:''}
            </div>
        );
    }
}


Timeline.propTypes={
    data: PropTypes.object.isRequired,
    order: PropTypes.array.isRequired,
    closeTip: PropTypes.bool
};

export default Timeline;