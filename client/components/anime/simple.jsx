import React, {PropTypes,Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../../config';
import {getImageUrl} from '../../common/tool';

//封装组件
class Simple extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
    render() {
        const {data} = this.props;
        return (
            <div className="app-anime-item">
                <p className="cover">
                    <Link to={clientPath+'/dashboard/anime/'+data._id}>
                        <img src={getImageUrl(data.cover,data.cover_clip,150)} width="150" height="90" />
                    </Link>
                </p>
                <p className="title" title={data.name}><Link to={clientPath+'/dashboard/anime/'+data._id}>{data.name}</Link></p>
                <p className="alias" title={data.alias}>{data.alias}</p>
            </div>
        )
    }
}

Simple.propTypes={
    data:PropTypes.object.isRequired
}

export default Simple;