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
                <div className="app-footer-toolbar">
                    <Link to={clientPath+'/dashboard/config'} activeClassName="active" onlyActiveOnIndex={true}><i className="icon icon-config"></i></Link>
                    <a onClick={()=>this.handleToolbarClick('logout')}><i className="icon icon-logout"></i></a>
                </div>
            )
        }else{
            toolbar=<div className="pull-right">&copy; {YEAR} acgo.club</div>;
        }
        return (
            <div className="app-footer">
                <div className="app-footer-logo">
                    <img src="/img/logo.png" width="100" height="25" />
                </div>
                <div className="app-footer-nav">
                    {nav.map((curNav,index)=>{
                        return <Link key={index} to={clientPath+curNav.link} activeClassName="active" onlyActiveOnIndex={true}>{curNav.name}</Link>
                    })}
                </div>
                <div className="pull-right">{toolbar}</div>
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