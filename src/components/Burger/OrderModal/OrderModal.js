import React from 'react';
import './OrderModal.css';
import Button from '../../Tools/Button/Button';
import Spinner from '../../Tools/Spinner/Spinner';
import {Link} from 'react-router-dom';

const OrderModal=(props)=>{
	const orderList = Object.keys(props.ingredients)
	.map(igKey=>{
		if(props.ingredients[igKey]){
			return (
			<li key={igKey}>
				<span className="ing-name">{igKey}</span> <span className="ing-amount">x{props.ingredients[igKey]}</span>
			</li>)
		}
	});
	let modalContent = <div className="OrderModal modal">
		<h1>Your Order</h1>
		<ul>
			{orderList}
		</ul>
		<p id="totalPrice">Total price: <span className="priceNumber">{props.price}$</span></p>
		<div className="buttons">
			<Link className="btn success" to="/checkout" btnType='success'>Next step</Link>
			<Button btnType='danger' clicked={props.showHideModal}>Cancel</Button>
		</div>
	</div>
	if(props.loading){
		modalContent =<div className="OrderModal modal"> <Spinner /></div>
	}
	else if(props.success){
		modalContent = <div className="SuccessModal modal">
		<h1>Your order has been sent!</h1>
		<Button btnType='success' clicked={props.reset}>Finish</Button>
		</div>
	}

	return(
		<React.Fragment>
		<div onClick={props.showHideModal} className="mask"></div>
			{modalContent}
		</React.Fragment>
	)
}

export default OrderModal;