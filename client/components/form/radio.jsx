import React, {PropTypes,Component} from 'react';

//封装组件
class Radio extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        const {value} = this.props;
        if(value===nextProps.value) return false;
        return true;
    }
    render() {
        const {name,label,list,value,disabled} = this.props;
        let labelContent;
        if(label) labelContent=<div className="app-form-label">{label}</div>;
        return (
            <div className="app-form-control app-form-radio">
                {labelContent}
                <div className="app-form-content">
                    <ul className={'app-check app-check-radio'+(disabled?' app-check-disabled':'')}>
                        {list.map((item,index)=>{
                            let checked=item.value==value?'checked':'';
                            return <li key={index} className={checked} onClick={(e)=>this.handleChangeVal(item.value)}>{item.name}</li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
    handleChangeVal(value){
        const {name,disabled,onChangeVal} = this.props;
        if(disabled) return;
        onChangeVal(name,value);
    }
}

Radio.propTypes={
    name:PropTypes.string.isRequired,
    label:PropTypes.string,
    list:PropTypes.array.isRequired,
    value:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    disabled:PropTypes.bool,
    onChangeVal:PropTypes.func.isRequired
}

export default Radio;