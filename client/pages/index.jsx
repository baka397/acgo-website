import {PropTypes,Component} from 'react';
import {connect} from 'react-redux';

import {authLoginStatus} from '../actions/auth';

function propMap(state){
    return {
        user:state.user
    };
}

//封装组件
class Home extends Component {
    componentDidMount(){
        const { user, dispatch } = this.props;
        dispatch(authLoginStatus(user,null,true));
    }
    render() {
        return null;
    }
}

Home.propTypes={
    user:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};

export default connect(propMap)(Home);