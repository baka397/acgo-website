import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux'
import {escape,trim} from 'validator';
import {Link} from 'react-router';
import {clientPath} from '../../config';
import {serialize,getQuery} from '../../common/tool';

import FormSearch from '../../components/form/search.jsx';
import Page from '../../components/page/index.jsx';
import AnimeList from '../../components/anime/index.jsx';

import {modalUpdate} from '../../actions/modal';
import {search,cleanAnime} from '../../actions/anime';

function propMap(state,ownProps){
    return {
        anime:state.anime,
        routing:ownProps
    }
}

//封装组件
class Search extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    componentDidMount(){
        const {routing,dispatch} = this.props;
        dispatch(search(getQuery(routing)));
    }
    componentDidUpdate(prevProps, prevState){
        const {routing,dispatch} = this.props;
        let beforeQuery=getQuery(prevProps.routing);
        let query=getQuery(routing);
        if(query.keyword!==beforeQuery.keyword||query.page!==beforeQuery.page){
            dispatch(search(query));
        }
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
        if(query.keyword){
            let addBtn=<Link to={clientPath+'/dashboard/anime/add?name='+escape(query.keyword)} className="btn btn-info m-l"><i className="icon icon-plus m-r-sm"></i>我来添加</Link>;
            page=<Page page={anime.page} pageSize={anime.pageSize} total={anime.total} onPageClick={this.handlePageClick} />;
            if(anime.order.length>0){
                searchTip=(
                    <div className="app-search-content">
                        <AnimeList order={anime.order} datas={anime.content} type="simple" />
                        <p className="m-t">没有正确的数据?{addBtn}</p>
                    </div>
                )
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
        let query=getQuery(routing);
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
        let query=getQuery(routing);
        query.page=page;
        dispatch(push(clientPath+'/dashboard/search/?'+serialize(query)));
    }
}
export default connect(propMap)(Search);