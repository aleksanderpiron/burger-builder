import React from 'react';
import './Input.css';
import check from '../../../assets/img/tick.svg';

const Input = (props) =>{
    let choosenElement = null;

    switch (props.inputType){
        case ('input'):
            choosenElement = <input onBlur={props.onBlur} type="text" className={props.touched?props.valid?'input-success':'input-fail':null} name={props.inputName} onChange={props.onChange} placeholder=' '/>
        break;
        case ('textarea'):
            choosenElement = <textarea onBlur={props.onBlur} className={props.touched?props.valid?'input-success':'input-fail':null} rows={props.rows} cols={props.cols} name={props.inputName} onChange={props.onChange} placeholder=' ' />
        break;

    }
    return(
        <label id={props.labelId}>
            {choosenElement}
            <span>{props.placeholder}</span>
            <div className="error-mess">{props.errorMessage}</div>
            <div className={props.touched?props.valid?'check active':'check':'check'}>
                <img src={check} alt=""/>
            </div>
        </label>
    )
}

export default Input;