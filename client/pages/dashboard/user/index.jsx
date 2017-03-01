import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';

function propMap(state,ownProps){
    return {
        profile:state.profile,
        routing:ownProps
    };
}

//封装组件
class UserIndex extends Component {
    render() {
        return (
            <div className="app-timeline">
            用户主页内容
            </div>
        );
    }
}
UserIndex.propTypes={
    profile:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(UserIndex);