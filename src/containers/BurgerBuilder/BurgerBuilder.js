import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import OrderModal from '../../components/Burger/OrderModal/OrderModal';
import axios from '../../axiosOrders';

const INGREDIENT_PRICES = {
	meat: 1.5,
	tomato: 0.5,
	cheese: 0.4,
	bacon: 0.7,
	salad: 0.3
}

class BurgerBuilder extends Component{
	state = {
		ingredients: {
			salad: 0,
			tomato: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 0,
		canOrder: false,
		OrderModal: false,
		loading:false,
		success: false,
		inputErrors:{
			inputName: false,
			inputPhone: false
		}
	}
	
	updateCanOrderState (ingredients){
		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey];
		}).reduce((sum, el) =>{
			return sum + el;
		}, 0);
		this.setState({canOrder: sum > 0});
	}
	
	showHideModalHandler=()=>{
		let decide = this.state.OrderModal;
		decide = !decide; 
		this.setState({OrderModal:decide});
	}

	addIngredientsHandler=(type)=>{
		let oldCount = this.state.ingredients[type];
		let newCount = oldCount + 1;
		const updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type] = newCount;
		

		let oldPrice = this.state.totalPrice;
		let ingPrice = INGREDIENT_PRICES[type];
		let newPrice = oldPrice + ingPrice; 
		newPrice = Math.round(newPrice * 100) / 100;
		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
		this.updateCanOrderState(updatedIngredients);
	}	

	removeIngredientsHandler=(type)=>{
		let oldCount = this.state.ingredients[type];
		if(oldCount <= 0){
			return;
		}
		let newCount = oldCount - 1;
		
		const updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type] = newCount;

		let oldPrice = this.state.totalPrice;
		let ingPrice = INGREDIENT_PRICES[type];
		let newPrice = oldPrice - ingPrice; 
		newPrice = Math.round(newPrice * 100) / 100;
		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
		this.updateCanOrderState(updatedIngredients);
	}	
	
	finalizeOrderHandler=(name, phone)=>{
		if(name != "" && phone != ""){
			this.setState({loading:true});
			const orderedBurger = {
				Ingredients: this.state.ingredients,
				Price: this.state.totalPrice,
				PhoneNumber: phone,
				Name: name
			}
			axios.post('/orders.json', orderedBurger).then(response=>{
				this.setState({loading:false, success:true});
			});
		}
		else{
		}
	}
	resetHandler=()=>{
		const resetedState = {
			ingredients: {
				salad: 0,
				tomato: 0,
				bacon: 0,
				cheese: 0,
				meat: 0,
			},
			totalPrice: 0,
			canOrder: false,
			OrderModal: false,
			loading:false,
			success: false
		}
		this.setState(resetedState);
	}

	render(){
		let disabledButtons = {...this.state.ingredients};
		for(let key in disabledButtons){
			disabledButtons[key] = disabledButtons[key] <= 0;
		}

		return(
			<React.Fragment>
				{this.state.OrderModal ? <OrderModal errors={this.state.inputErrors} reset={this.resetHandler} success={this.state.success} loading={this.state.loading} finishOrder={this.finalizeOrderHandler} price={this.state.totalPrice} showHideModal={this.showHideModalHandler} ingredients={this.state.ingredients}/> : null}
				<Burger ingredients={this.state.ingredients}/>
				<BurgerControls  showHideModal={this.showHideModalHandler} canOrder={this.state.canOrder} price={this.state.totalPrice} disabledBtns={disabledButtons} addHandler={this.addIngredientsHandler} removeHandler={this.removeIngredientsHandler} ingredients={this.state.ingredients} />
			</React.Fragment>
			);
	}
}

export default BurgerBuilder;