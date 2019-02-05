import React from 'react';
import './BurgerControl.css';

const BurgerControl = (props) => (
		<div className="BurgerControl">
			<div className="ing-label">{props.label}</div>
			<div className="ing-amount">{props.amount>0?'x'+props.amount:null}</div>
			<div className="ing-buttons">
				<button onClick={props.add} className="more">+</button>
				<button onClick={props.remove} className="less" disabled={props.disable}>-</button>
			</div>
		</div>
	)

export default BurgerControl;