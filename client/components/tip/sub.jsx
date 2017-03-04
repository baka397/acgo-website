import React, {Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../../config';

//封装组件
class SubTip extends Component {
    shouldComponentUpdate(){
        return false;
    }
    render() {
        return (
        <div className="app-tip">
            <div className="app-tip-title">
                <p><i className="icon icon-tv"></i></p>
            </div>
            <div className="app-tip-message">
                <p className="m-b">暂无订阅数据</p>
                <p><Link to={clientPath+'/dashboard/discover/square/all'} className="btn btn-info"><i className="icon icon-search m-r-sm"></i>立即查找</Link></p>
            </div>
        </div>
        );
    }
}

export default SubTip;