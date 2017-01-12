import React, {Component} from 'react';
import {connect} from 'react-redux';

import HeaderPage from '../../components/common/header_page.jsx';
import Footer from '../../components/common/footer.jsx';

import {authLoginStatus} from '../../actions/auth';
import {userLogout} from '../../actions/user';

import {isObjEmpty} from '../../common/tool';

function propMap(state,ownProps){
    return {
        user:state.user,
        routing:ownProps
    }
}

let nav=[
    {
        name:'控制台',
        link:'/dashboard/'
    },{
        name:'探索',
        link:'/dashboard/search/'
    }
];

//封装组件
class FrameDefault extends Component {
    constructor(props){
        super(props);
        this.state = {
            nav: nav
        };
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleToolbarClick = this.handleToolbarClick.bind(this);
    }
    componentDidMount(){
        const {user,dispatch} = this.props;
        const {nav} = this.state;
        dispatch(authLoginStatus(user,true));
        if(user.role==='admin'){
            let adminNav=nav.concat([{
                name:'审核',
                link:'/dashboard/anime/audit/'
            }]);
            this.setState({
                nav:adminNav
            });
        }
    }
    render() {
        const {user,routing} = this.props;
        const {nav} = this.state;
        if(isObjEmpty(user)){
            return null;
        }
        return (
            <div className="app-dashboard">
                <HeaderPage route={routing} icons={['min','max','close']} onIconClick={this.handleIconClick} />
                <div className="app-content">
                    {this.props.children}
                </div>
                <Footer nav={nav} onToolbarClick={this.handleToolbarClick} />
            </div>
        )
    }
    handleIconClick(iconName){
        console.log(iconName);
    }
    handleToolbarClick(toolName){
        const {dispatch} = this.props;
        switch(toolName){
            case 'logout':
                dispatch(userLogout());
                break;
        }
    }
}
export default connect(propMap)(FrameDefault);