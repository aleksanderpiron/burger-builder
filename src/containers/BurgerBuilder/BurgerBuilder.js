import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import BurgersList from '../../components/Burger/BurgersList/BurgersList';
import OrderModal from '../../components/Burger/OrderModal/OrderModal';
import {connect} from 'react-redux';
import * as actionsList from '../../store/actions';

class BurgerBuilder extends Component{
	state = {
		totalPrice: 0,
		canOrder: false,
		OrderModal: false,
		loading:false,
		success: false,
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

	render(){
		let disabledButtons = {...this.props.ingredients};
		for(let key in disabledButtons){
			disabledButtons[key] = disabledButtons[key] <= 0;
		}
		return(
			<React.Fragment>
				{this.state.OrderModal ? <OrderModal reset={this.resetHandler} success={this.state.success} loading={this.state.loading} finishOrder={this.finalizeOrderHandler} price={this.props.totalPrice} showHideModal={this.showHideModalHandler} ingredients={this.props.ingredients}/> : null}
				<BurgersList addBurger={this.props.addBurger} switchBurger={this.props.switchBurger}/>
				<div>
					<Burger ingredients={this.props.ingredients}/>
				</div>
				<BurgerControls  showHideModal={this.showHideModalHandler} canOrder={this.updateCanOrderState(this.props.allIngredients)} price={this.props.totalPrice} disabledBtns={disabledButtons} addHandler={this.props.addIngredientHandler} removeHandler={this.props.removeIngredientHandler} ingredients={this.props.ingredients} />
			</React.Fragment>
			);
	}
}

const mapStateToProps = (state) =>{
	return{
		ingredients: state.burgersIngredients[state.currentBurger],
		allIngredients: state.burgersIngredients,
		currentBurger: state.currentBurger,
		totalPrice: state.totalPrice,
	}
}
const mapDispatchToProps = (dispatch) =>{
	return{
		addIngredientHandler:(ingName)=> dispatch({type: actionsList.ADD_INGREDIENT, ingName:ingName, }),
		removeIngredientHandler:(ingName)=> dispatch({type: actionsList.REMOVE_INGREDIENT, ingName:ingName}),
		switchBurger:(pointedBrg)=> dispatch({type: actionsList.SWITCH_BURGER, pointedBurger:pointedBrg}),
		addBurger:()=> dispatch({type: actionsList.ADD_BURGER}),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);