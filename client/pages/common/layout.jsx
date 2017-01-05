import React, {Component} from 'react';
import {connect} from 'react-redux';

import HeaderPage from '../../components/common/header_page.jsx';
import Footer from '../../components/common/footer.jsx';

import {authLoginStatus} from '../../actions/auth';

import {isObjEmpty} from '../../common/tool';

function propMap(state){
    return {
        user:state.user,
        routing:state.routing
    }
}

//封装组件
class FrameDefault extends Component {
    componentDidMount(){
        const {user, dispatch} = this.props;
        dispatch(authLoginStatus(user,false));
    }
    render() {
        const {user,routing} = this.props;
        if(!isObjEmpty(user)){
            return null;
        }
        return (
            <div className="app-common">
                <HeaderPage route={routing} icons={['min','close']} />
                <div className="app-content">
                    {this.props.children}
                </div>
                <Footer nav={[]} />
            </div>
        )
    }
}
export default connect(propMap)(FrameDefault);