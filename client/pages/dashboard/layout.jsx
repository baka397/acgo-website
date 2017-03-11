import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';

import HeaderPage from '../../components/common/headerPage.jsx';
import Footer from '../../components/common/footer.jsx';

import {authLoginStatus} from '../../actions/auth';
import {profileLogout} from '../../actions/profile';

import {isObjEmpty,authRole,isClient} from '../../common/tool';
import {windowChange} from '../../common/ipc';

function propMap(state,ownProps){
    return {
        profile:state.profile,
        routing:ownProps
    };
}

let nav=[
    {
        name:'控制台',
        link:'/dashboard/'
    },{
        name:'发现',
        link:'/dashboard/discover/square/friend/'
    }
];

//封装组件
class DashboardLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            nav: nav,
            icons: isClient()?['refresh','min','max','close']:[]
        };
        this.handleToolbarClick = this.handleToolbarClick.bind(this);
    }
    componentDidMount(){
        const {profile,dispatch} = this.props;
        const {nav} = this.state;
        dispatch(authLoginStatus(profile,true));
        if(authRole('admin',profile.role)){
            let adminNav=nav.concat([{
                name:'审核',
                link:'/dashboard/anime/audit/'
            }]);
            this.setState({
                nav:adminNav
            });
        }
        windowChange('dashboard');
    }
    render() {
        const {profile,routing} = this.props;
        const {nav,icons} = this.state;
        if(isObjEmpty(profile)){
            return null;
        }
        return (
            <div className="app-dashboard">
                <HeaderPage route={routing} icons={icons} />
                <div className="app-content">
                    {this.props.children}
                </div>
                <Footer nav={nav} onToolbarClick={this.handleToolbarClick} avatar={profile.avatar} avatarClip={profile.avatar_clip} userId={profile._id} />
            </div>
        );
    }
    handleToolbarClick(toolName){
        const {dispatch} = this.props;
        switch(toolName){
        case 'logout':
            dispatch(profileLogout());
            break;
        }
    }
}

DashboardLayout.propTypes={
    profile:PropTypes.object.isRequired,
    routing:PropTypes.object.isRequired,
    children:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};
export default connect(propMap)(DashboardLayout);