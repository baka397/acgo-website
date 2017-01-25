import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetch} from '../../common/api';
import {clientPath} from '../../config';
import {isObjEmpty,getImageUrl} from '../../common/tool';
import {type} from '../../enums/tag';
import {showStatus} from '../../enums/anime';

import {getAnimeDetail,cleanAnime} from '../../actions/anime';
import {modalUpdate,modalClean} from '../../actions/modal';

function propMap(state){
    return {
        animeDetail:state.anime.detail
    }
}
//封装组件
class animeAudit extends Component {
    constructor(props){
        super(props);
        this.state={
            auditDetail:{},
            tags:{}
        }
    }
    componentDidMount(){
        this.handleInit();
    }
    shouldComponentUpdate(nextProps, nextState){
        const {animeDetail} = this.props;
        const {auditDetail,tags} = this.state;
        if(auditDetail._id===nextState.auditDetail._id&&animeDetail._id===nextProps.animeDetail._id&&isObjEmpty(nextState.tags)) return false;
        return true;
    }
    componentDidUpdate(prevProps, prevState){
        const {animeDetail,dispatch} = this.props;
        const {auditDetail,tags} = this.state;
        if(isObjEmpty(auditDetail)){
            this.handleInit();
        }else if(!isObjEmpty(animeDetail)&&isObjEmpty(tags)){ //载入标签数据
            let tagsId={},staffsId={},cvsId={};
            let tagList=[].concat(animeDetail.tag);
            let staffList=[].concat(animeDetail.staff);
            let cvList=[].concat(animeDetail.cv);
            let promiseList=[];
            if(auditDetail.tag) tagsList=tagsList.concat(auditDetail.tag);
            if(auditDetail.staff) staffList=staffList.concat(auditDetail.staff);
            if(auditDetail.cv) cvList=cvList.concat(auditDetail.cv);
            tagsList.forEach((tagId)=>{
                tagsId[tagId]=true;
            });
            staffList.forEach((staffId)=>{
                staffsId[staffId]=true;
            });
            cvsId.forEach((cvId)=>{
                cvsId[cvId]=true;
            });
            dispatch(modalUpdate({
                loading:true
            }));
            promiseList.push(fetch('tag',{
                ids:Object.keys(tagsId),
                type:1
            }))
            promiseList.push(fetch('tag',{
                ids:Object.keys(staffsId),
                type:2
            }))
            promiseList.push(fetch('tag',{
                ids:Object.keys(cvsId),
                type:3
            }))
            Promise.all(promiseList).then(result=>{
                dispatch(modalClean('loading'));
                let tagsList={};
                result.forEach((res)=>{
                    res.data.content.forEach(item=>{
                        tagsList[item._id]=item.name;
                    })
                })
                this.setState({
                    tags:tagsList
                });
            }).catch(err=>{
                dispatch(modalClean('loading'));
            })
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(cleanAnime());
    }
    render() {
        const {animeDetail} = this.props;
        const {auditDetail,tags} = this.state;
        let aliasContent,descContent,coverContent,tagContent,staffContent,cvContent,showStatusContent;
        if(!animeDetail._id||!auditDetail._id) return (
            <div className="app-tip m-t-hg">
                <div className="app-tip-title">
                    <i className="icon icon-search"></i>
                </div>
                <div className="app-tip-message">
                    <p className="m-b">暂时没有需要审核的数据</p>
                    <p><Link to={clientPath+'/dashboard/'} className="btn btn-info"><i className="icon icon-prev m-r-sm"></i>返回</Link></p>
                </div>
            </div>
        );
        //别名
        if(auditDetail.alias&&animeDetail.alias!==auditDetail.alias){
            aliasContent=(
                <span><del>{animeDetail.alias}</del>{auditDetail.alias}</span>
            )
        }else{
            aliasContent=animeDetail.alias;
        }
        //描述
        if(auditDetail.desc&&animeDetail.desc!==auditDetail.desc){
            descContent=(
                <div>
                    <p><del>{animeDetail.desc}</del></p>
                    <p>{auditDetail.desc}</p>
                </div>
            )
        }else{
            descContent=animeDetail.desc;
        }
        //封面图
        if(auditDetail.cover&&auditDetail.cover_clip&&animeDetail.cover!==auditDetail.cover&&animeDetail.cover_clip.toString()!==auditDetail.cover_clip.toString()){
            coverContent=(
                <span>
                    <img src={getImageUrl(animeDetail.cover,animeDetail.cover_clip,360)} className="disabled" />
                    <img src={getImageUrl(auditDetail.cover,auditDetail.cover_clip,360)} />
                </span>
            )
        }else{
            coverContent=<img src={getImageUrl(animeDetail.cover,animeDetail.cover_clip,360)} />;
        }
        //标签
        if(auditDetail.tag.length>0&&animeDetail.tag.toString()!==auditDetail.tag.toString()){
            tagContent=(
                <span className="app-list-inline">
                    <del>
                        {animeDetail.tag.map(function(id){
                            return <span key={id}>{tags[id]}</span>;
                        })}
                    </del>
                    {auditDetail.tag.map(function(id){
                        return <span key={id}>{tags[id]}</span>;
                    })}
                </span>
            )
        }else{
            tagContent=(
                <span className="app-list-inline">
                    {animeDetail.tag.map(function(id){
                        return <span key={id}>{tags[id]}</span>;
                    })}
                </span>
            )
        }
        //制作
        if(auditDetail.staff.length>0&&animeDetail.staff.toString()!==auditDetail.staff.toString()){
            staffContent=(
                <span className="app-list-inline">
                    <del>
                        {animeDetail.staff.map(function(id){
                            return <span key={id}>{tags[id]}</span>;
                        })}
                    </del>
                    {auditDetail.staff.map(function(id){
                        return <span key={id}>{tags[id]}</span>;
                    })}
                </span>
            )
        }else{
            staffContent=(
                <span className="app-list-inline">
                    {animeDetail.staff.map(function(id){
                        return <span key={id}>{tags[id]}</span>;
                    })}
                </span>
            )
        }
        //声优
        if(auditDetail.cv.length>0&&animeDetail.cv.toString()!==auditDetail.cv.toString()){
            cvContent=(
                <span className="app-list-inline">
                    <del>
                        {animeDetail.cv.map(function(id){
                            return <span key={id}>{tags[id]}</span>;
                        })}
                    </del>
                    {auditDetail.cv.map(function(id){
                        return <span key={id}>{tags[id]}</span>;
                    })}
                </span>
            )
        }else{
            cvContent=(
                <span className="app-list-inline">
                    {animeDetail.cv.map(function(id){
                        return <span key={id}>{tags[id]}</span>;
                    })}
                </span>
            )
        }
        //连载状态
        if(auditDetail.show_status&&animeDetail.show_status!==auditDetail.show_status){
            showStatusContent=(
                <span><del>{showStatus[animeDetail.show_status]}</del>{showStatus[auditDetail.show_status]}</span>
            )
        }else{
            showStatusContent=showStatus[animeDetail.show_status];
        }
        return (
            <div className="app-anime-audit m">
                <div className="app-form app-form-long app-form-plain">
                    <div className="app-form-control">
                        <div className="app-form-label">中文名称</div>
                        <div className="app-form-content">
                            {animeDetail.name}
                        </div>
                    </div>
                    <div className="app-form-control">
                        <div className="app-form-label">动画别名</div>
                        <div className="app-form-content">
                            {aliasContent}
                        </div>
                    </div>
                    <div className="app-form-control">
                        <div className="app-form-label">描述</div>
                        <div className="app-form-content">
                            {descContent}
                        </div>
                    </div>
                    <div className="app-form-control">
                        <div className="app-form-label">展示图</div>
                        <div className="app-form-content">
                            {coverContent}
                        </div>
                    </div>
                    <div className="app-form-control">
                        <div className="app-form-label">{type[1]}</div>
                        <div className="app-form-content">
                            {tagContent}
                        </div>
                    </div>
                    <div className="app-form-control">
                        <div className="app-form-label">{type[2]}</div>
                        <div className="app-form-content">
                            {staffContent}
                        </div>
                    </div>
                    <div className="app-form-control">
                        <div className="app-form-label">{type[3]}</div>
                        <div className="app-form-content">
                            {cvContent}
                        </div>
                    </div>
                    <div className="app-form-control">
                        <div className="app-form-label">连载状态</div>
                        <div className="app-form-content">
                            {showStatusContent}
                        </div>
                    </div>
                    <div className="app-form-footer app-form-button">
                        <button type="button" className="btn btn-info m-r" onClick={()=>{this.handleAudit(1)}}><i className="icon icon-pass m-r-sm"></i>审核通过</button>
                        <button type="button" className="btn btn-danger" onClick={()=>{this.handleAudit(-1)}}><i className="icon icon-unpass m-r-sm"></i>审核拒绝</button>
                    </div>
                </div>
            </div>
        )
    }
    handleInit(){
        const {dispatch} = this.props;
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeAudit').then((res)=>{
            dispatch(getAnimeDetail({
                id:res.data.anime_id
            }));
            this.setState({
                auditDetail:res.data
            });
        }).catch((err)=>{
            dispatch(modalClean('loading'));
        })
    }
    handleClear(){
        const {dispatch} = this.props;
        dispatch(cleanAnime());
        this.setState({
            auditDetail:{},
            tags:{}
        });
    }
    handleAudit(status){
        const {dispatch} = this.props;
        const {auditDetail} = this.state;
        dispatch(modalUpdate({
            loading:true
        }));
        fetch('animeAudit',{
            status,
            id:auditDetail._id
        },'POST').then((res)=>{
            dispatch(modalUpdate({
                tip:res.msg,
                loading:null
            }))
            this.handleClear();
        }).catch((err)=>{
            dispatch(modalUpdate({
                tip:err.message,
                loading:null
            }))
        })
    }
}
export default connect(propMap)(animeAudit);