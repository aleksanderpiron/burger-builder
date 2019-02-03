import React from 'react';
import './Summary.css';
import Button from '../../Tools/Button/Button';
import {Link} from 'react-router-dom';

const Summary=(props)=>{
	const orderList = Object.entries(props.ingredients)
	.map(item=>{
			return (
			<div key={item[0]+'a'}>
				<p className="burgerName">{item[0].split('_').join(' #')}</p>
				<ul>
					{
						Object.entries(item[1]).map(it=>{
							if(it[1]>0){
								return (<li key={item[0]+it[0]}>
										<span className="ing-name">{it[0]}</span> <span className="ing-amount">x{it[1]}</span>
									</li>);
								}
								else{
									return false;
								}
						})
					}
				</ul>
			</div>
			)
	});
	
	return(
		<React.Fragment>
			<div className="Summary">
				<h1>Your Order</h1>
				<div className="Summary-list">
					{orderList}
				</div>
				<p id="totalPrice">Total price: <span className="priceNumber">{props.price}$</span></p>
				<p>Is your order correct?</p>
				<div className="buttons">
					<Button  btnType='success' clicked={props.nextStep}>Correct</Button>
					<Button btnType='danger' clicked={props.prevStep}>Back</Button>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Summary;