import React, {PropTypes,Component} from 'react';

//封装组件
class NormalPage extends Component {
    shouldComponentUpdate(nextProps){
        const {page,total} = this.props;
        if(page===nextProps.page&&total===nextProps.total) return false;
        return true;
    }
    render() {
        const {page,pageSize,total} = this.props;
        let pageTotal=Math.ceil(total/pageSize);
        if(pageTotal===0) pageTotal=1;
        let pagePrev,pageNext;
        if(page===1){
            pagePrev=(<li className="disabled"><a>&lt;</a></li>);
        }else{
            pagePrev=(<li><a onClick={()=>this.handlePageClick(page-1)}>&lt;</a></li>);
        }
        if(pageTotal===page){
            pageNext=(<li className="disabled"><a>&gt;</a></li>);
        }else{
            pageNext=(<li><a onClick={()=>this.handlePageClick(page+1)}>&gt;</a></li>);
        }
        return (
            <div className="pagination pagination-simple">
                <ul>
                    {pagePrev}
                    <li className="disabled"><a>{page}/{pageTotal}</a></li>
                    {pageNext}
                </ul>
            </div>
        );
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
};

export default NormalPage;