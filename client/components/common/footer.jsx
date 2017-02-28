import React, {PropTypes,Component} from 'react';
import {Link} from 'react-router';
import {clientPath} from '../../config';
import Avatar from '../avatar/index.jsx';

const YEAR = new Date().getFullYear();

//封装组件
class Footer extends Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        const {nav,avatar,avatarClip} = this.props;
        let validClip=Array.isArray(avatarClip)&&Array.isArray(nextProps.avatarClip);
        if(validClip){
            validClip=avatarClip.every(function(clip,index){
                return clip!==nextProps.avatarClip[index];
            });
        }
        if(nav.length===nextProps.nav.length&&avatar===nextProps.avatar&&validClip) return false;
        return true;
    }
    render() {
        const {avatar,avatarClip,nav,onToolbarClick} = this.props;
        let toolbar;
        if(onToolbarClick){
            toolbar=(
                <div className="app-footer-toolbar">
                    <Link to={clientPath+'/user/me'}><Avatar avatar={avatar} avatarClip={avatarClip} size="small" /></Link>
                    <Link to={clientPath+'/dashboard/config'} activeClassName="active" onlyActiveOnIndex={true}><i className="icon icon-config"></i></Link>
                    <a onClick={()=>this.handleToolbarClick('logout')}><i className="icon icon-logout"></i></a>
                </div>
            );
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
                        return <Link key={index} to={clientPath+curNav.link} activeClassName="active" onlyActiveOnIndex={true}>{curNav.name}</Link>;
                    })}
                </div>
                <div className="pull-right">{toolbar}</div>
            </div>
        );
    }
    handleToolbarClick(iconName){
        const {onToolbarClick} = this.props;
        onToolbarClick(iconName);
    }
}


Footer.propTypes={
    nav: PropTypes.array.isRequired,
    avatar: PropTypes.string,
    avatarClip: PropTypes.array,
    onToolbarClick: PropTypes.func
};

export default Footer;