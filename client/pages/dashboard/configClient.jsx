import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSizeInfo} from '../../common/tool';

import {getClientCache,cleanClient,clearClientCache} from '../../actions/client';

function propMap(state){
    return {
        client:state.client
    }
}

//封装组件
class ConfigClient extends Component {
    constructor(props){
        super(props);
        this.handleClearCache = this.handleClearCache.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {client} = this.props;
        if(client.cache===nextProps.client.cache) return false;
        return true;
    }
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(getClientCache());
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(cleanClient());
    }
    render() {
        const {client} = this.props;
        return (
            <div className="app-config-client">
                <div className="app-form app-form-long app-form-plain">
                    <div className="app-form-control">
                        <div className="app-form-label">缓存</div>
                        <div className="app-form-content">现有{getSizeInfo(client.cache)}缓存. <button className="btn btn-danger m-l" onClick={this.handleClearCache}><i className="icon icon-delete"></i>清除缓存</button></div>
                    </div>
                </div>
            </div>
        )
    }
    handleClearCache(){
        const {dispatch} = this.props;
        dispatch(clearClientCache());
    }
}

export default connect(propMap)(ConfigClient);