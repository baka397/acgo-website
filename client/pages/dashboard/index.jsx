import React, {Component} from 'react';
import {connect} from 'react-redux';

function propMap(state){
    return {
    }
}

//封装组件
class Index extends Component {
    render() {
        return (
            <div className="app-list">
                测试
            </div>
        )
    }
}
export default connect(propMap)(Index);