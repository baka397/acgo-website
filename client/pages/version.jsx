import React,{Component} from 'react';
import versionLimit from 'versionLimit';

import {windowChange,updateClientVersion} from '../common/ipc';

//封装组件
class Version extends Component {
    constructor(props){
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    componentDidMount(){
        windowChange('common',168);
    }
    render() {
        return (
            <div className="app-tip app-background">
                <h1 className="app-tip-title m">410</h1>
                <p className="app-tip-message m">当前客户端版本不能再进行访问</p>
                <p className="m"><a className="btn btn-info btn-block" onClick={this.handleUpdate}><i className="icon icon-download m-r-sm"></i>更新到{versionLimit}</a></p>
            </div>
        );
    }
    handleUpdate(){
        updateClientVersion(versionLimit);
        setTimeout(function(){
            window.close();
        },1000);
    }
}

export default Version;