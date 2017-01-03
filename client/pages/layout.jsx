import React, { Component } from 'react';

//封装组件
class Layout extends Component {
    render() {
        return (
            <div className="app-layout">
                {this.props.children}
            </div>
        )
    }
}
export default Layout;