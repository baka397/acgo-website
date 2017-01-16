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
            pagePrev=(<li className="disabled"><a>&lt;</a></li>);
        }else{
            pagePrev=(<li><a onClick={(e)=>{this.handlePageClick(page-1)}}>&lt;</a></li>);
        }
        if(pageTotal===pageEnd){
            pageNext=(<li className="disabled"><a>&gt;</a></li>);
        }else{
            pageNext=(<li><a onClick={(e)=>{this.handlePageClick(page+1)}}>&gt;</a></li>);
        }
        return (
            <div className="pagination pagination-simple">
                <ul>
                    {pagePrev}
                    <li className="disabled"><a>{page}/{pageTotal}</a></li>
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