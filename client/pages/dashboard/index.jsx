import React, {PropTypes,Component} from 'react';
import {connect} from 'react-redux';

import AnimeList from '../../components/anime/index.jsx';
import Tip from '../../components/tip/index.jsx';

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
        return (
            <div className={'app-home m'+(animeSub.order.length===0?' app-home-empty':'')}>
                <AnimeList order={animeSub.order} datas={animeSub.content} watchDatas={animeWatch} type="sub" />
                {animeSub.order.length===0?<Tip type="sub" />:''}
            </div>
        );
    }
}
Index.propTypes={
    animeWatch:PropTypes.object.isRequired,
    animeSub:PropTypes.object.isRequired
};
export default connect(propMap)(Index);