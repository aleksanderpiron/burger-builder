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
    formData:{
        name:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                minLength:false,
                minLengthNum:3,
                notEmpty:false,
            },
            touched:false
        },
        address:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                notEmpty:false,
            },
            touched:false
        },
        city:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                notEmpty:false,
            },
            touched:false
        },
        phone:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                minLength:false,
                minLengthNum:9,
                isNumber:false,
                notEmpty:false,
            },
            touched:false
        },
        message:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
            },
            touched:false
        },
        login:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                notEmpty:false,
            },
            touched:false
        },
        password:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                minLength:false,
                minLengthNum:6,
                notEmpty:false,
            },
            touched:false
        },
        repeatPassword:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                // sameAs: 'password',
            },
            touched:false
        }
    },
}
let newTotalPrice = null;
let ingPrice = null;
let validationPassed;

const reducer=(state=initialState, actions)=>{

        const formValidate = (value, updatedValidaton) =>{
        let validationPassed = true;

        // RULES START
        // NOT EMPTY
        if(typeof updatedValidaton.validation.notEmpty !== 'undefined'){
            if(value.trim().length > 0){
                updatedValidaton.validation.notEmpty = true;
            }else if(value.trim().length === 0){
                updatedValidaton.validation.notEmpty = false;
            }
        }

        // NOT TOO SHORT
        if(typeof updatedValidaton.validation.minLength !== 'undefined'){
            value = value.replace(/\s+/g, '');
            if(value.trim().length >= updatedValidaton.validation.minLengthNum){
                updatedValidaton.validation.minLength = true;
            }else if(value.trim().length >= 1){
                updatedValidaton.validation.minLength = false;
            }
        }

        // IS NUMBER
        if(typeof updatedValidaton.validation.isNumber !== 'undefined'){
            value = value.replace(/\s+/g, '');
            if(isNaN(value.trim()) === false){
                updatedValidaton.validation.isNumber = true;
            }else if(isNaN(value.trim()) === true){
                updatedValidaton.validation.isNumber = false;
            }
        }

        // RULES END

        for(var o in updatedValidaton.validation){
            if(!updatedValidaton.validation[o]){
                validationPassed = false;
                switch(o){
                    case 'isNumber':
                        updatedValidaton.errorMessage = 'Value must be number!';
                    break;
                    case 'minLength':
                        updatedValidaton.errorMessage = 'Value is too short!';
                    break;
                    case 'notEmpty':
                        updatedValidaton.errorMessage = 'Input is empty!';
                    break;
                    default:
                    return false;
                }
            }
        }
        return validationPassed;
        }

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

        case actionsList.INPUT_HANDLE:
            const updatedState = {...state.formData};
            updatedState[actions.targetName].value = actions.targetValue;
            validationPassed = formValidate(actions.targetValue, updatedState[actions.targetName]);
            updatedState[actions.targetName].valid = validationPassed;
            return{
                ...state,
                formData:updatedState
            }

        case actionsList.BLUR_HANDLE:
            const newStateData = {...state.formData};
            validationPassed = formValidate(actions.targetValue, newStateData[actions.targetName]);
            newStateData[actions.targetName].valid = validationPassed;
            newStateData[actions.targetName].touched = true;
            return{
                ...state,
                formData:newStateData
            }

        case actionsList.RESET_VALID:
            const resetedValid = {...state.formData};
            const resetedIngredients = {
                bacon: 0,
                salad: 0,
                tomato: 0,
                cheese: 0,
                meat: 0,
            };
            Object.values(resetedValid).map(item=>{
                item.valid = false;
                item.touched = false;
            });

            return{
                ...state,
                formData:resetedValid,
                ingredients:resetedIngredients
            }

            default:
            return state;

        }
}

export default reducer;