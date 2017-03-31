import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';

import HeaderPage from '../../components/common/headerPage.jsx';

import {authLoginStatus} from '../../actions/auth';

import {isObjEmpty,isClient} from '../../common/tool';
import {windowChange} from '../../common/ipc';

function propMap(state,ownProps){
    return {
        profile:state.profile,
        routing:ownProps
    };
}

//封装组件
class WindowLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            icons: isClient()?['refresh','submin','submax','subclose']:[]
        };
    }
    componentDidMount(){
        const {profile,dispatch} = this.props;
        dispatch(authLoginStatus(profile,true));
        windowChange('dashboard');
    }
    render() {
        const {profile,routing} = this.props;
        const {icons} = this.state;
        if(isObjEmpty(profile)){
            return null;
        }
        return (
            <div className="app-dashboard">
                <HeaderPage route={routing} icons={icons} />
                <div className="app-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

WindowLayout.propTypes={
    profile:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    children:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(WindowLayout);