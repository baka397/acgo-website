import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux'
import {escape,trim} from 'validator';
import {Link} from 'react-router';
import {clientPath} from '../../config';
import {serialize,getQuery} from '../../common/tool';

import FormSearch from '../../components/form/search.jsx';
import Page from '../../components/page/index.jsx';

import {modalUpdate} from '../../actions/modal';
import {search,cleanAnime} from '../../actions/anime';

function propMap(state){
    return {
        anime:state.anime,
        routing:state.routing
    }
}

//封装组件
class Search extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        let query=getQuery(nextProps.routing);
        let beforeQuery=getQuery(this.props.routing);
        if(query.keyword===beforeQuery.keyword&&query.page===beforeQuery.page) return false;
        return true;
    }
    componentDidMount(){
        const {routing,dispatch} = this.props;
        dispatch(search(getQuery(routing)));
    }
    componentDidUpdate(prevProps, prevState){
        const {routing,dispatch} = this.props;
        dispatch(search(getQuery(routing)));
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(cleanAnime());
    }
    render() {
        const {anime,routing} = this.props;
        let query=getQuery(routing);
        let formRule=[
            {
                name:'keyword',
                value:query.keyword,
                type:'text',
                placeholder:'请输入动画名称'
            },
            {
                label:'立即探索',
                type:'submit',
                icon:'search'
            }
        ]
        let page,animeList,searchTip;
        let animeIds=Object.keys(anime.content);
        if(query.keyword){
            let addBtn=<Link to={clientPath+'/dashboard/anime/add?name='+escape(query.keyword)} className="btn btn-info m-l btn-round">帮我们添加</Link>;
            page=<Page page={anime.page} pageSize={anime.pageSize} total={anime.total} onPageClick={this.handlePageClick} />;
            if(animeIds.length>0){
                searchTip=<p className="m-t">没有正确的数据?{addBtn}</p>
            }else{
                searchTip=<p className="text-light m-t">抱歉,没有查找到数据.{addBtn}</p>
            }
        }
        return (
            <div className={'app-search m'+(query.keyword?' app-search-list':'')}>
                <FormSearch rules={formRule} onSubmit={this.handleSubmit} />
                {animeList}
                {searchTip}
                {page}
            </div>
        )
    }
    handleSubmit(data){
        const {routing,dispatch} = this.props;
        let keyword=trim(data.keyword);
        let query=Object.assign({},routing.locationBeforeTransitions.query);
        if(!keyword){
            dispatch(push(clientPath+'/dashboard/search/'));
        }else{
            query.keyword=escape(keyword);
            query.page=1;
            dispatch(push(clientPath+'/dashboard/search/?'+serialize(query)));
        }
    }
    handlePageClick(page){
        const {routing,dispatch} = this.props;
        let query=Object.assign({},routing.locationBeforeTransitions.query);
        query.page=page;
        dispatch(push(clientPath+'/dashboard/search/?'+serialize(query)));
    }
}
export default connect(propMap)(Search);