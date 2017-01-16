import React, {PropTypes,Component} from 'react';

//封装组件
class NormalPage extends Component {
    shouldComponentUpdate(nextProps, nextState){
        const {page,total} = this.props;
        if(page===nextProps.page&&total===nextProps.total) return false;
        return true;
    }
    render() {
        const {page,pageSize,total} = this.props;
        let pageTotal=Math.ceil(total/pageSize);
        if(pageTotal===0) pageTotal=1;
        let pageStart = page - 2 > 0 ? page - 2 : 1;
        let pageEnd = pageStart + 4 >= pageTotal ? pageTotal : pageStart + 4;
        let pagePrev,pagePrevMore,pageNext,pageNextMore,pageList=[];
        if(page===1){
            pagePrev=(<li className="disabled"><a><i className="icon icon-prev"></i></a></li>);
        }else{
            pagePrev=(<li><a onClick={(e)=>{this.handlePageClick(1)}}><i className="icon icon-prev"></i></a></li>);
        }
        if(pageTotal===pageEnd){
            pageNext=(<li className="disabled"><a><i className="icon icon-next"></i></a></li>);
        }else{
            pageNext=(<li><a onClick={(e)=>{this.handlePageClick(pageTotal)}}><i className="icon icon-next"></i></a></li>);
        }
        if(pageStart>1){
            pagePrevMore=(<li><a>...</a></li>);
        }
        if(page>pageEnd){
            pageNextMore=(<li><a>...</a></li>);
        }
        for(let i = pageStart; i <= pageEnd; i++) {
            pageList.push(i);
        }
        return (
            <div className="pagination">
                <ul>
                    {pagePrev}
                    {pagePrevMore}
                    {pageList.map((pageNum)=>{
                        if(pageNum===page) return <li key={pageNum} className="disabled"><a>{pageNum}</a></li>
                        else return <li><a key={pageNum} onClick={(e)=>{this.handlePageClick(pageNum)}}>{pageNum}</a></li>
                    })}
                    {pageNextMore}
                    {pageNext}
                </ul>
            </div>
        )
    }
    handlePageClick(page){
        const {onPageClick} = this.props;
        onPageClick(page);
    }
}

NormalPage.propTypes={
    page:PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired,
    total:PropTypes.number.isRequired,
    onPageClick:PropTypes.func.isRequired
}

export default NormalPage;