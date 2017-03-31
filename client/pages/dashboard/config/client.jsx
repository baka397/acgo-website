import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {getSizeInfo,getEnumArray} from '../../../common/tool';
import {animeWin} from '../../../enums/client';

import FormList from '../../../components/form/index.jsx';

import {getClientCache,clearClientCache,postClientConfig} from '../../../actions/client';
import {updateAdblockRule} from '../../../common/ipc';

const ANIME_WIN = getEnumArray(animeWin);

const FORM_RULE=[
    {
        name:'animeWin',
        label:'开启窗口',
        type:'radio',
        value:'0',
        list: ANIME_WIN
    },
    {
        label:'保存',
        type:'submit',
        icon:'confirm'
    }
];

function propMap(state){
    return {
        client:state.client
    };
}

//封装组件
class ConfigClient extends Component {
    constructor(props){
        super(props);
        this.handleClearCache = this.handleClearCache.bind(this);
        this.handleUpdateRule = this.handleUpdateRule.bind(this);
        this.handleSubmitAnimeConfig = this.handleSubmitAnimeConfig.bind(this);
        this.state={
            animeFormRule:[]
        };
    }
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(getClientCache());
    }
    componentDidUpdate(){
        const {client} = this.props;
        const {animeFormRule} = this.state;
        if(animeFormRule.length===0&&client.config){
            let newFormRule=FORM_RULE.map(rule=>{
                if(rule.name&&client.config[rule.name]){
                    return Object.assign({},rule,{
                        value:client.config[rule.name]
                    });
                }
                return Object.assign({},rule);
            });
            this.setState({
                animeFormRule:newFormRule
            });
        }
    }
    render() {
        const {client} = this.props;
        const {animeFormRule} = this.state;
        let animeForm;
        if(animeFormRule.length>0){
            animeForm=<FormList rules={animeFormRule} longlabel={true} onSubmit={this.handleSubmitAnimeConfig} />;
        }
        return (
            <div className="app-config-client">
                <div className="app-form app-form-long app-form-plain">
                    <div className="app-form-control">
                        <div className="app-form-label">缓存目录</div>
                        <div className="app-form-content">{client.dir}</div>
                    </div>
                    <div className="app-form-control">
                        <div className="app-form-label">当前缓存</div>
                        <div className="app-form-content">现有{getSizeInfo(client.cache)}缓存. <button className="btn btn-danger m-l" onClick={this.handleClearCache}><i className="icon icon-delete m-r-sm"></i>清除缓存</button></div>
                    </div>
                    <div className="app-form-control">
                        <div className="app-form-label">广告屏蔽</div>
                        <div className="app-form-content"><button className="btn btn-primary" onClick={this.handleUpdateRule}><i className="icon icon-download m-r-sm"></i>更新规则</button></div>
                    </div>
                </div>
                <div className="app-title m-b"><i className="icon icon-tv m-r-sm"></i>新窗口观看动画</div>
                {animeForm}
            </div>
        );
    }
    handleClearCache(){
        const {dispatch} = this.props;
        dispatch(clearClientCache());
    }
    handleUpdateRule(){
        updateAdblockRule();
    }
    handleSubmitAnimeConfig(data){
        const {dispatch} = this.props;
        dispatch(postClientConfig(data));
    }
}

ConfigClient.propTypes={
    client:PropTypes.object.isRequired,
    dispatch:PropTypes.func.isRequired
};

export default connect(propMap)(ConfigClient);