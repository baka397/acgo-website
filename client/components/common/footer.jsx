import React, {PropTypes,Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../../config';

const YEAR = new Date().getFullYear();

//封装组件
class Footer extends Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {nav} = this.props;
        if(nav.length===nextProps.nav.length) return false;
        return true;
    }
    render() {
        const {nav,onToolbarClick} = this.props;
        let toolbar;
        if(onToolbarClick){
            toolbar=(
                <div className="toolbar">
                    <Link to={clientPath+'/dashboard/config'} activeClassName="active" onlyActiveOnIndex={true}><i className="icon icon-config"></i></Link>
                    <a onClick={()=>this.handleToolbarClick('logout')}><i className="icon icon-logout"></i></a>
                </div>
            )
        }else{
            toolbar=<div className="pull-right">&copy; {YEAR} acgo.club</div>;
        }
        return (
            <div className="app-footer">
                <div className="pull-right">{toolbar}</div>
                <div className="app-footer-nav">
                    <img src="/img/logo.png" width="100" height="25" />
                    {nav.map((curNav)=>{
                        <Link to={clientPath+curNav.link} activeClassName="active" onlyActiveOnIndex={true}>{curNav.name}</Link>
                    })}
                </div>
            </div>
        )
    }
    handleToolbarClick(iconName){
        const {onToolbarClick} = this.props;
        onToolbarClick(iconName);
    }
}


Footer.propTypes={
    nav: PropTypes.array.isRequired,
    onToolbarClick: PropTypes.func
}

export default Footer;