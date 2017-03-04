import {PropTypes,Component} from 'react';
import {connect} from 'react-redux';

import {authLoginStatus} from '../actions/auth';

function propMap(state){
    return {
        profile:state.profile
    };
}

//封装组件
class Home extends Component {
    componentDidMount(){
        const { profile, dispatch } = this.props;
        dispatch(authLoginStatus(profile,null,true));
    }
    render() {
        return null;
    }
}

Home.propTypes={
    profile:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};

export default connect(propMap)(Home);