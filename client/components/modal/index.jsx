import React, {PropTypes,Component} from 'react';
import Tip from './tip.jsx';
import Loading from './loading.jsx';

//封装组件
class Modal extends Component {
    constructor(props){
        super(props);
        this.handleHide = this.handleHide.bind(this);
    }
    render() {
        const { modals } = this.props;
        return (
            <div className="app-modal">
                {Object.keys(modals).map((key)=>{
                    switch(key){
                        case 'loading':
                            return <Loading key={key} status={modals[key]} />
                            break;
                        case 'tip':
                            return <Tip key={key} tip={modals[key]} onHide={this.handleHide} />
                            break;
                        default:
                            return null;
                    }
                })}
            </div>
        )
    }
    handleHide(name){
        const { onHide } = this.props;
        onHide(name);
    }
}

Modal.propTypes={
    modals:PropTypes.object.isRequired,
    onHide:PropTypes.func.isRequired
}

export default Modal;