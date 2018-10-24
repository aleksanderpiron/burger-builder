import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients).map(igKey =>{
		return [...Array(props.ingredients[igKey])].map((_, i)=>{
			return <BurgerIngredient key={igKey + i} type={igKey} />;
		});
	}).reduce((arr, el) => {
		return arr.concat(el)
	}, []);
	if(transformedIngredients.length === 0){
		transformedIngredients = <p>Start composing your burger by adding ingredients in console below </p>
	}

	return(
		<div className="Burger">
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
}

export default burger;