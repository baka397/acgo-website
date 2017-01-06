import React, {PropTypes,Component} from 'react';

//封装组件
class Text extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {value} = this.props;
        if(value===nextProps.value) return false;
        return true;
    }
    render() {
        const {name,label,list,value} = this.props;
        let labelContent;
        if(label) labelContent=<div className="app-form-label">{label}</div>;
        return (
            <label className="app-form-control app-form-radio">
                {labelContent}
                <div className="app-form-content">
                    <ul className="app-check app-check-radio">
                        {list.map((item,index)=>{
                            let checked=item.value===value?'checked':'';
                            return <li key={index} className={checked} onClick={(e)=>this.handleChangeVal(item.value)}>{item.name}</li>
                        })}
                    </ul>
                </div>
            </label>
        )
    }
    handleChangeVal(value){
        const {name,onChangeVal} = this.props;
        onChangeVal(name,value);
    }
}

Text.propTypes={
    name:PropTypes.string.isRequired,
    label:PropTypes.string,
    list:PropTypes.array.isRequired,
    value:PropTypes.string,
    onChangeVal:PropTypes.func.isRequired
}

export default Text;