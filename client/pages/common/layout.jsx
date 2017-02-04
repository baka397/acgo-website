import React, {Component} from 'react';
import {connect} from 'react-redux';

import HeaderPage from '../../components/common/header_page.jsx';
import Footer from '../../components/common/footer.jsx';

import {authLoginStatus} from '../../actions/auth';

import {isObjEmpty,isClient} from '../../common/tool';

function propMap(state,ownProps){
    return {
        user:state.user,
        routing:ownProps
    }
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
        const {user, dispatch} = this.props;
        dispatch(authLoginStatus(user,false));
    }
    render() {
        const {user,routing} = this.props;
        const {icons} = this.state;
        if(!isObjEmpty(user)){
            return null;
        }
        return (
            <div className="app-common">
                <HeaderPage route={routing} icons={icons} />
                <div className="app-content">
                    {this.props.children}
                </div>
                <Footer nav={[]} />
            </div>
        )
    }
}
export default connect(propMap)(CommonLayout);