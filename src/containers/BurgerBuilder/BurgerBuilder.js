import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import OrderModal from '../../components/Burger/OrderModal/OrderModal';
import axios from '../../axiosOrders';
import {connect} from 'react-redux';
import * as actionsList from '../../store/actions';

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
		return sum > 0;
	}

	showHideModalHandler=()=>{
		let decide = this.state.OrderModal;
		decide = !decide;
		this.setState({OrderModal:decide});
	}

	finalizeOrderHandler=(name, phone)=>{
		if(name !== "" && phone !== ""){
			this.setState({loading:true});
			const orderedBurger = {
				Ingredients: Object.entries(this.state.ingredients),
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
		let disabledButtons = {...this.props.ingredients};
		for(let key in disabledButtons){
			disabledButtons[key] = disabledButtons[key] <= 0;
		}
		console.log(this.props.ingredients);
		return(
			<React.Fragment>
				{this.state.OrderModal ? <OrderModal errors={this.state.inputErrors} reset={this.resetHandler} success={this.state.success} loading={this.state.loading} finishOrder={this.finalizeOrderHandler} price={this.props.totalPrice} showHideModal={this.showHideModalHandler} ingredients={this.props.ingredients}/> : null}
				<Burger ingredients={this.props.ingredients}/>
				<BurgerControls  showHideModal={this.showHideModalHandler} canOrder={this.updateCanOrderState(this.props.ingredients)} price={this.props.totalPrice} disabledBtns={disabledButtons} addHandler={this.props.addIngredientHandler} removeHandler={this.props.removeIngredientHandler} ingredients={this.props.ingredients} />
			</React.Fragment>
			);
	}
}

const mapStateToProps = (state) =>{
	return{
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
	}
}
const mapDispatchToProps = (dispatch) =>{
	return{
		addIngredientHandler:(ingName)=> dispatch({type: actionsList.ADD_INGREDIENT, ingName:ingName, }),
		removeIngredientHandler:(ingName)=> dispatch({type: actionsList.REMOVE_INGREDIENT, ingName:ingName})
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);