import React from 'react';
import './OrderModal.css';
import Button from '../../Tools/Button/Button';
import Spinner from '../../Tools/Spinner/Spinner';

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
	let errorMess = "";
	const inputValidateHandler=(input)=>{
		const inputValue = input.target.value;
		console.log(inputValue);
		if(inputValue == ""){
			errorMess = "This field is required!"
		}
		else if(inputValue < 3){
			errorMess = "It's too short!"
		}
	}
	let modalContent = <div className="OrderModal modal">
		<h1>Your Order</h1>
		<ul>
			{orderList}
		</ul>
		<p id="totalPrice">Total price: <span className="priceNumber">{props.price}$</span></p>
		<p>
			<span>Please write your name: </span>
			<input  id="name" type="text"/>
			{/* <p className="error">{errorMess}</p> */}
			{/* onChange={inputValidateHandler.bind(this)} */}
		</p>
		<p>
			<span>And your phone number: </span>
			<input id="phone" name='phone' type="number"/>
		</p>
		<div className="buttons">
			<Button clicked={(name, phone)=>props.finishOrder(document.querySelector('#name').value, document.querySelector('#phone').value)} btnType='success'>Send order</Button>
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