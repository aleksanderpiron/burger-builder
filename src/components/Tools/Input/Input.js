import React from 'react';
import './Input.css';
import check from '../../../assets/img/tick.svg';

const Input = (props) =>{
    let choosenElement = null;

    switch (props.inputType){
        case ('input'):
            choosenElement = <input form={props.formName} onBlur={props.onBlur} type="text" className={props.disableColors?null:props.touched?props.valid?'input-success':'input-fail':null} name={props.inputName} onChange={props.onChange} placeholder=' '/>
        break;
        case ('input-password'):
            choosenElement = <input form={props.formName} onBlur={props.onBlur} type="password" className={props.disableColors?null:props.touched?props.valid?'input-success':'input-fail':null} name={props.inputName} onChange={props.onChange} placeholder=' '/>
        break;
        case ('textarea'):
            choosenElement = <textarea form={props.formName} onBlur={props.onBlur} className={props.disableColors?null:props.touched?props.valid?'input-success':'input-fail':null} rows={props.rows} cols={props.cols} name={props.inputName} onChange={props.onChange} placeholder=' ' />
        break;
        default:
        return null;
    }
    return(
        <label id={props.labelId}>
            {choosenElement}
            <span>{props.placeholder}</span>
            <div className="error-mess">{props.errorMessage}</div>
            <div className={props.disableColors?'d-none':props.touched?props.valid?'check active':'check':'check'}>
                <img src={check} alt=""/>
            </div>
        </label>
    )
}

export default Input;