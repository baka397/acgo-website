import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';

import HeaderPage from '../../components/common/headerPage.jsx';
import Footer from '../../components/common/footer.jsx';

import {authLoginStatus} from '../../actions/auth';

import {isObjEmpty,isClient} from '../../common/tool';

function propMap(state,ownProps){
    return {
        profile:state.profile,
        routing:ownProps
    };
}

//封装组件
class CommonLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            icons: isClient()?['min','close']:[]
        };
    }
    componentDidMount(){
        const {profile, dispatch} = this.props;
        dispatch(authLoginStatus(profile,false));
    }
    render() {
        const {profile,routing,children} = this.props;
        const {icons} = this.state;
        if(!isObjEmpty(profile)){
            return null;
        }
        return (
            <div className="app-common">
                <HeaderPage route={routing} icons={icons} />
                <div className="app-content">
                    {children}
                </div>
                <Footer nav={[]} />
            </div>
        );
    }
}

CommonLayout.propTypes={
    profile:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    children:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};

export default connect(propMap)(CommonLayout);