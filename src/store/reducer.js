import * as actionsList from './actions';

const INGREDIENT_PRICES = {
    tomato: 0.5,
	meat: 1.5,
	cheese: 0.4,
	bacon: 0.7,
	salad: 0.3
}

const initialState ={
    ingredients: {
        bacon: 0,
        salad: 0,
        tomato: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 0,
}
let newTotalPrice = null;
let ingPrice = null;

const reducer=(state=initialState, actions)=>{
    switch(actions.type){
        case actionsList.ADD_INGREDIENT:
            ingPrice = INGREDIENT_PRICES[actions.ingName];
            newTotalPrice = state.totalPrice + ingPrice;
            newTotalPrice = Math.round(newTotalPrice * 100) / 100;

            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [actions.ingName]:state.ingredients[actions.ingName] + 1
                },
                totalPrice:newTotalPrice
            }
        case actionsList.REMOVE_INGREDIENT:
            ingPrice = INGREDIENT_PRICES[actions.ingName];
            newTotalPrice = state.totalPrice - ingPrice;
            newTotalPrice = Math.round(newTotalPrice * 100) / 100;

            if(newTotalPrice<0){
                newTotalPrice = 0;
            }
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [actions.ingName]:state.ingredients[actions.ingName] - 1
                },
                totalPrice:newTotalPrice
            }
            default:
            return state;
        }
}

export default reducer;