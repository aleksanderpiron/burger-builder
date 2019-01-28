import React from 'react';
import './OrderModal.css';
import Button from '../../Tools/Button/Button';
import Spinner from '../../Tools/Spinner/Spinner';
import {Link} from 'react-router-dom';

const OrderModal=(props)=>{
	console.log(Object.entries(props.ingredients));
	const orderList = Object.entries(props.ingredients)
	.map(item=>{
			return (
			<div>
				<p className="burgerName">{item[0]}</p>
				<ul>
					{
						Object.entries(item[1]).map(it=>{
							if(it[1]>0){

								return (<li>
										<span className="ing-name">{it[0]}</span> <span className="ing-amount">x{it[1]}</span>
									</li>);
								}
						})
					}
				</ul>
			</div>
			)
	});
	let modalContent = <div className="OrderModal modal">
		<h1>Your Order</h1>
		<div className="modal-ing-body">
			{orderList}
		</div>
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