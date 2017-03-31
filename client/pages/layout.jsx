import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {isClient} from '../common/tool';

import Modal from '../components/modal/index.jsx';

import {modalClean} from '../actions/modal';
import {getClientCacheDir,getClientConfig} from '../actions/client';

function propMap(state){
    return {
        modal:state.modal
    };
}

//封装组件
class Layout extends Component {
    constructor(props){
        super(props);
        this.handleHide = this.handleHide.bind(this);
    }
    componentDidMount(){
        const {dispatch} = this.props;
        if(isClient()){
            //初始化client数据
            dispatch(getClientConfig());
            dispatch(getClientCacheDir());
        }
    }
    render() {
        const {modal,children} = this.props;
        return (
            <div className="app-layout">
                <Modal modals={modal} onHide={this.handleHide} />
                {children}
            </div>
        );
    }
    handleHide(name){
        const {dispatch} = this.props;
        dispatch(modalClean(name));
    }
}

Layout.propTypes={
    modal:PropTypes.object.isRequired,
    children:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};

export default connect(propMap)(Layout);