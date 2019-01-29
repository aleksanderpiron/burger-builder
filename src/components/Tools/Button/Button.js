import React from 'react';
import './Button.css';

const Button=(props)=>{
	return(
		<button onKeyPress={props.keyPress} disabled={props.disableBtn} onClick={props.clicked} className={['btn', props.btnType].join(' ')}>{props.children}</button>
		);
}

export default Button;