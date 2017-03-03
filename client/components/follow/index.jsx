import React, {PropTypes,Component} from 'react';

import FollowItem from './item.jsx';

//封装组件
class Follow extends Component {
    render() {
        const {data,order,type} = this.props;
        return (
            <div className="app-follow app-column app-column-short">
                {
                    order.map(key=>{
                        return <FollowItem key={key} data={data[key]} type={type} />;
                    })
                }
                {order.length===0?<div className="m-t m-b">暂无数据</div>:''}
            </div>
        );
    }
}


Follow.propTypes={
    data: PropTypes.object.isRequired,
    order: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['follow','fan']).isRequired
};

export default Follow;