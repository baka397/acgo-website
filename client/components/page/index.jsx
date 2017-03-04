import React, {PropTypes,Component} from 'react';

import PageNormal from './normal.jsx';
import PageSimple from './simple.jsx';

//封装组件
class Page extends Component {
    render() {
        const {type,page,pageSize,total,onPageClick} = this.props;
        if(total<=pageSize) return null;
        switch(type){
        case 'simple':
            return <PageSimple page={page} pageSize={pageSize} total={total} onPageClick={onPageClick} />;
        default:
            return <PageNormal page={page} pageSize={pageSize} total={total} onPageClick={onPageClick} />;
        }
    }
}

Page.propTypes={
    type:PropTypes.string,
    page:PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired,
    total:PropTypes.number.isRequired,
    onPageClick:PropTypes.func.isRequired
};

export default Page;