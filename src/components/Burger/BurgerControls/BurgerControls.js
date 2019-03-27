import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';
import Button from '../../Tools/Button/Button';
import BurgersList from '../BurgersList/BurgersList';
import './BurgerControls.css';

const BurgerControls = (props) => {
	const controls = Object.entries(props.ingredients).map((currentIng)=>{
			const ingValue = currentIng[0];
			let ingLabel = currentIng[0].charAt(0).toUpperCase() + currentIng[0].slice(1);
			const ingAmount = currentIng[1];

		return {
			label: ingLabel, type: ingValue, amount: ingAmount
		}
	});

	return(
		<div className="controls">
			<h2>Ingredients</h2>
				{controls.map(ctrl=>(
					<BurgerControl
					 add={()=> props.addHandler(ctrl.type)}
					 remove={()=> props.removeHandler(ctrl.type)}
					 disablePlus={props.disabledPlusBtns[ctrl.type]}
					 disableMinus={props.disabledMinusBtns[ctrl.type]}
					 key={ctrl.label}
					 label={ctrl.label}
					 amount={ctrl.amount}
						/>
					))}
					<BurgersList />
			<h3>Total price: {props.price} $</h3>
			<Button customClass="next-step-btn" btnType="success" clicked={props.nextStep} id="orderBtn" disableBtn={!props.canOrder || !props.logged}>Next step</Button>
			<Button customClass="prev-step-btn" btnType="info" clicked={()=>props.close('newOrder')} id="orderBtn">Back</Button>
		</div>
	)
	}

export default BurgerControls;