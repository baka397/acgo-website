import React, {PropTypes,Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../../config';

//封装组件
class Tab extends Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {tab} = this.props;
        if(tab.length===nextProps.tab.length) return false;
        return true;
    }
    render() {
        const {tab} = this.props;
        return (
            <ul className="app-tab">
                {tab.map((curTab,index)=>{
                    return <li key={index}><Link to={clientPath+curTab.link} activeClassName="active" onlyActiveOnIndex={true}>{curTab.name}</Link></li>
                })}
            </ul>
        )
    }
}


Tab.propTypes={
    tab: PropTypes.array.isRequired
}

export default Tab;