import React, { Component } from 'react';
import './BurgerBuilder.css'
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import BurgersList from '../../components/Burger/BurgersList/BurgersList';
import OrderModal from '../../components/Burger/OrderModal/OrderModal';
import Checkout from '../Checkout/Checkout';
import {connect} from 'react-redux';
import * as actionsList from '../../store/actions';

class BurgerBuilder extends Component{
	state = {
		totalPrice: 0,
		OrderModal: false,
		loading:false,
		success: false,
		driverState:false,
        step:1,
	}

	updateCanOrderState (ingredients){
		let amount = 0;
		const sum = Object.keys(ingredients).map(igKey => {
			Object.values(ingredients[igKey]).map((item, index)=>{
				amount = amount+item;
				return item;
			})
			return sum;
		})
		if(amount>0 && this.props.logged){
			return true;
		}
		else if(amount === 0){
			return false;
		}
	}

	showHideModalHandler=()=>{
		let decide = this.state.OrderModal;
		decide = !decide;
		this.setState({OrderModal:decide});
	}

	nextStepHandler=()=>{
        let newStep = this.state.step;
        newStep++;
        this.setState(prevState=>{
          return {
            driverState: !prevState.driverState,
             step:newStep}
        })
	  }
	  
      prevStepHandler=()=>{
        let newStep = this.state.step;
        newStep--;
        this.setState(prevState=>{
          return {
            driverState: !prevState.driverState,
             step:newStep}
        })
      }
	render(){
		let leftContent = 
        <div className="step-one">
            <h2>Step one</h2>
            <button onClick={this.nextStepHandler}>Next step</button>
        </div>;
        let rightContent = 
        <div className="step-two">
            <h2>Step two</h2>
            <button onClick={this.nextStepHandler}>Next step</button>
        </div>;
        if(this.state.step>2){
          leftContent = 
          <div className="step-three">
            <h2>Step three</h2>
			{this.state.OrderModal ? <OrderModal reset={this.resetHandler} success={this.state.success} loading={this.state.loading} finishOrder={this.finalizeOrderHandler} price={this.props.totalPrice} showHideModal={this.showHideModalHandler} ingredients={this.props.allIngredients}/> : null}
            <button onClick={this.nextStepHandler}>Next step</button>
          </div>;
        }
        if(this.state.step>3){
          rightContent = 
          <div className="step-four">
            <h2>Step four</h2>
            <Checkout />
            <button onClick={this.nextStepHandler}>Next step</button>
          </div>;
          }
        if(this.state.step>4){
          leftContent = 
          <div className="step-five">
            <h2>Step five</h2>
          </div>;
		}
		
		let disabledButtons = {...this.props.ingredients};
		for(let key in disabledButtons){
			disabledButtons[key] = disabledButtons[key] <= 0;
		}
		return(
			<React.Fragment>
				<div className={this.state.driverState?'curtain left-pos':'curtain'}>
					<Burger ingredients={this.props.ingredients}/>
				</div>
                <div className="step-box flex-box">
                    {leftContent}
                    {rightContent}
                </div>
				
				{/* <BurgersList addBurger={this.props.addBurger} switchBurger={this.props.switchBurger}/> */}
				<BurgerControls  showHideModal={this.showHideModalHandler} canOrder={this.updateCanOrderState(this.props.allIngredients)} price={this.props.totalPrice} disabledBtns={disabledButtons} addHandler={this.props.addIngredientHandler} removeHandler={this.props.removeIngredientHandler} ingredients={this.props.ingredients} />
			</React.Fragment>
			);
	}
}

const mapStateToProps = (state) =>{
	return{
		ingredients: state.burgersIngredients[state.currentBurger],
		allIngredients: state.burgersIngredients,
		logged:state.logged,
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