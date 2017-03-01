import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {clientPath} from '../../config';

import AnimeList from '../../components/anime/index.jsx';

function propMap(state){
    return {
        animeWatch:state.animeWatch.content,
        animeSub:state.animeSub
    };
}

//封装组件
class Index extends Component {
    render() {
        const {animeSub,animeWatch} = this.props;
        let indexTip;
        if(animeSub.order.length===0){
            indexTip=(
                <div className="app-tip">
                    <div className="app-tip-title">
                        <p><i className="icon icon-star-empty"></i></p>
                    </div>
                    <div className="app-tip-message">
                        <p className="m-b">暂无订阅数据</p>
                        <p><Link to={clientPath+'/dashboard/discover/search/'} className="btn btn-info"><i className="icon icon-search m-r-sm"></i>立即探索</Link></p>
                    </div>
                </div>
            );
        }
        return (
            <div className={'app-home m'+(animeSub.order.length===0?' app-home-empty':'')}>
                <AnimeList order={animeSub.order} datas={animeSub.content} watchDatas={animeWatch} type="sub" />
                {indexTip}
            </div>
        );
    }
}
Index.propTypes={
    animeWatch:PropTypes.object.isRequired,
    animeSub:PropTypes.object.isRequired
};
export default connect(propMap)(Index);