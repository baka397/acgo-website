import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/common/header.jsx';

const YEAR = new Date().getFullYear();

function propMap(state){
    return {
        routing:state.routing
    }
}

//封装组件
class FrameDefault extends Component {
    render() {
        const { routing } = this.props;
        return (
            <div className="app-default">
                <Header routeInfo={routing} icons={['min','close']} />
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
}
export default connect(propMap)(FrameDefault);