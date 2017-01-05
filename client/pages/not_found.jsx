import React, {Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../config';

//封装组件
class NotFound extends Component {
    render() {
        const {modal} = this.props;
        return (
            <div className="app-tip">
                <h1 className="app-tip-title">404</h1>
                <p className="app-tip-message">找不到这个页面</p>
                <p><Link to={clientPath+'/'} className="btn btn-info btn-round btn-block">返回</Link></p>
            </div>
        )
    }
}
export default NotFound;