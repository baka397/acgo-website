import React, {Component} from 'react';
import {connect} from 'react-redux';

import HeaderPage from '../../components/common/header_page.jsx';

const YEAR = new Date().getFullYear();

function propMap(state){
    return {
        routing:state.routing
    }
}

//封装组件
class FrameDefault extends Component {
    constructor(props){
        super(props);
        this.handleIconClick = this.handleIconClick.bind(this);
    }
    render() {
        const {routing} = this.props;
        return (
            <div className="app-default">
                <HeaderPage route={routing} icons={['min','close']} onIconClick={this.handleIconClick} />
                <div className="app-content">
                    {this.props.children}
                </div>
                <div className="app-footer">
                    <div className="pull-right">&copy; {YEAR} acgo.club</div>
                    <img src="/img/logo.png" />
                </div>
            </div>
        )
    }
    handleIconClick(iconName){
        console.log(iconName);
    }
}
export default connect(propMap)(FrameDefault);