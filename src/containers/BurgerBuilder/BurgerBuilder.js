import React, { Component } from 'react';
import './BurgerBuilder.css'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import BurgersList from '../../components/Burger/BurgersList/BurgersList';
import OrderHistory from '../OrderHistory/OrderHistory'
import BurgersPreview from '../../components/Burger/BurgersPreview/BurgersPreview';
import Summary from '../../components/Burger/Summary/Summary';
import Checkout from '../Checkout/Checkout';
import Button from '../../components/Tools/Button/Button'
import {connect} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import * as actionsList from '../../store/actions';

class BurgerBuilder extends Component{
	state = {
		curtainState:false,
		fullScreenPart:false,
		step:1,
		shownBurger:1,
		orderHistory:false,
		newOrder:false,
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

	// switchBurger=(pointedBurger)=>{
	// 	const newShownBurger = pointedBurger.substr(pointedBurger.length - 1);
	// 	console.log(newShownBurger);
	// 	this.setState({shownBurger:newShownBurger});
	// }

	nextStepHandler=()=>{
      let newStep = this.state.step;
			newStep++;
			if(this.state.step === 2){
      this.setState(prevState=>{
        return {
					 fullScreenPart:true,					
           step:newStep }
			})
		}else{
			this.setState(prevState=>{
        return {
          curtainState: !prevState.curtainState,
           step:newStep}
			})
		}
			
	}
  prevStepHandler=()=>{
    let newStep = this.state.step;
    newStep--;
		if(this.state.step === 3){
      this.setState(prevState=>{
        return {
					 fullScreenPart:false,					
           step:newStep }
			})
		}else{
			this.setState(prevState=>{
        return {
          curtainState: !prevState.curtainState,
           step:newStep}
			})
		}
	}

	toggleState=(target)=>{
		const updated = {...this.state};
		updated[target] = !updated[target];
		this.setState(updated);
	}

	render(){
		let disabledButtons = {...this.props.ingredients};
		for(let key in disabledButtons){
			disabledButtons[key] = disabledButtons[key] <= 0;
		}

		let leftContent =
        <div className="step-one">
						<CSSTransition classNames={'fade'} mountOnEnter unmountOnExit timeout={300} in={!this.state.orderHistory && !this.state.newOrder}>
							<div>
								<p>Start</p>
								<Button clicked={()=>{this.toggleState('newOrder')}} btnType={'success'}>New order</Button>
								<p>or</p>
								<Button btnType={'info'} clicked={()=>{this.toggleState('orderHistory')}}>Show order 	history</Button>
								<p>to repeat past order</p>
							</div>
						</CSSTransition>
						<CSSTransition classNames={'fade-left'} mountOnEnter unmountOnExit timeout={500} in={this.state.newOrder}>
							<BurgerControls
							nextStep={this.nextStepHandler}
							close={this.toggleState}
							canOrder={this.updateCanOrderState(this.props.allIngredients)}
							price={this.props.totalPrice} disabledBtns={disabledButtons}
							addHandler={this.props.addIngredientHandler}
							removeHandler={this.props.removeIngredientHandler}
							ingredients={this.props.allIngredients[this.props.currentBurger]}
							/>
						</CSSTransition>
						<CSSTransition classNames={'slide-up'} mountOnEnter unmountOnExit timeout={500} in={this.state.orderHistory}>
							<OrderHistory close={this.toggleState} />
						</CSSTransition>
				</div>;

    let rightContent =
        <div className="step-two">
						<Summary
						price={this.props.totalPrice}
						ingredients={this.props.allIngredients}
						nextStep={this.nextStepHandler}
						prevStep={this.prevStepHandler}
						/>
				</div>;
        if(this.state.step>2){
          leftContent =
          <div className="step-three">
            <Checkout prevStep={this.prevStepHandler} />
          </div>;
				}
				if(this.state.fullScreenPart){
					rightContent = null;
				}
		return(
			<React.Fragment>
				<div className={this.state.fullScreenPart?'curtain away-pos':this.state.curtainState?'curtain left-pos':'curtain'}>
					<BurgersPreview currentBurger={this.props.currentBurger} allIngredients={this.props.allIngredients} />
					{this.state.newOrder?
						<BurgersList
						burgers={this.props.allIngredients}
						shownBurger={this.state.shownBurger}
						/>
						:null}
					
				</div>
        <div className="step-box flex-box">
						{leftContent}
            {rightContent}
        </div>
			</React.Fragment>
			);
	}
}

const mapStateToProps = (state) =>{
	return{
		ingredients: state.burgersIngredients[state.currentBurger],
		allIngredients: state.burgersIngredients,
		logged: state.logged,
		currentBurger: state.currentBurger,
		totalPrice: state.totalPrice,
	}
}
const mapDispatchToProps = (dispatch) =>{
	return{
		addIngredientHandler:(ingName)=> dispatch({type: actionsList.ADD_INGREDIENT, ingName:ingName, }),
		removeIngredientHandler:(ingName)=> dispatch({type: actionsList.REMOVE_INGREDIENT, ingName:ingName}),
		addBurger:()=> dispatch({type: actionsList.ADD_BURGER}),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);