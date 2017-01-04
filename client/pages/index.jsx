import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {authLoginStatus} from '../actions/auth';

function propMap(state){
    return {
        user:state.user
    }
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

export default connect(propMap)(Home);