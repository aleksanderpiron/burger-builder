import * as actionsList from './actions';

const INGREDIENT_PRICES = {
    tomato: 0.5,
	meat: 1.5,
	cheese: 0.4,
	bacon: 0.7,
	salad: 0.3
}

const INGREDIENT_LIMITS = {
    tomato: 3,
	meat: 2,
	cheese: 4,
	bacon: 3,
	salad: 3
}

const initialState ={
    burgersIngredients:{
        burger0: {
            bacon: 0,
            salad: 0,
            tomato: 0,
            cheese: 0,
            meat: 0,
        },
    },
    currentBurger:'burger0',
    totalPrice: 3,
    logged:false,
    checkoutForm:{
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
            valid:true,
            validation:{
            },
            touched:false
        },
    },
    registerForm:{
        registerEmail:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                notEmpty:false,
            },
            touched:false
        },
        registerPassword:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                minLength:false,
                minLengthNum:9,
                notEmpty:false,
            },
            touched:false
        },
        repeat:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                notEmpty:false,
                // sameAs: 'password',
            },
            touched:false
        }
    },
    loginForm:{
        loginEmail:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                notEmpty:false,
            },
            touched:false
        },
        loginPassword:{
            value:'',
            errorMessage:null,
            valid:false,
            validation:{
                minLength:false,
                minLengthNum:9,
                notEmpty:false,
            },
            touched:false
        }
    }
    }
let newTotalPrice = null;
let ingPrice = null;
let validationPassed;
let updatedBurgerIng;

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

        // IS SAME AS
        // if(typeof updatedValidaton.validation.sameAs !== 'undefined'){
        //     const targetId = updatedValidaton.validation.sameAs;
        //     let model = {...state.formData[targetId]};
        //     model = model.value;
        //     if(value === model){
        //         console.log('takie samo');
        //         console.log(model);
        //         console.log(value);

        //         updatedValidaton.validation.sameAs = true;
        //     }else if(value !== model){
        //         console.log('nie takie samo');
        //         console.log(model);
        //         console.log(value);
        //         updatedValidaton.validation.sameAs = false;
        //     }
        // }

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
            updatedBurgerIng = {...state.burgersIngredients[state.currentBurger]};
            updatedBurgerIng[actions.ingName] = updatedBurgerIng[actions.ingName] + 1;

            if(state.burgersIngredients[state.currentBurger][actions.ingName] < INGREDIENT_LIMITS[actions.ingName]){
                return{
                    ...state,
                    burgersIngredients:{
                        ...state.burgersIngredients,
                        [state.currentBurger]:updatedBurgerIng
                    },
                    totalPrice:newTotalPrice
                }
            }

            return state;

        case actionsList.REMOVE_INGREDIENT:
            ingPrice = INGREDIENT_PRICES[actions.ingName];
            newTotalPrice = state.totalPrice - ingPrice;
            newTotalPrice = Math.round(newTotalPrice * 100) / 100;
            updatedBurgerIng = {...state.burgersIngredients[state.currentBurger]};
            updatedBurgerIng[actions.ingName] = updatedBurgerIng[actions.ingName] - 1;

            if(newTotalPrice<0){
                newTotalPrice = 0;
            }
            return{
                ...state,
                    burgersIngredients:{
                        ...state.burgersIngredients,
                        [state.currentBurger]:updatedBurgerIng
                },
                totalPrice:newTotalPrice
            }

        case actionsList.SWITCH_BURGER:
        const newCurrentBurger = actions.pointedBurger;
        return {
            ...state,
            currentBurger:newCurrentBurger
        };

        case actionsList.ADD_BURGER:

        const id = Object.values(state.burgersIngredients).length
        const newBurgerName = "burger"+id;
        const newBurgerBody = {
            bacon: 0,
            salad: 0,
            tomato: 0,
            cheese: 0,
            meat: 0,
        }
        const updatedburgersIngredients = {
            ...state.burgersIngredients,
            [newBurgerName]: newBurgerBody
        }
        return {
            ...state,
            burgersIngredients: updatedburgersIngredients
        };

        case actionsList.INPUT_HANDLE:
        const updatedState = {...state[actions.formName]};
            updatedState[actions.targetName].value = actions.targetValue;
            validationPassed = formValidate(actions.targetValue, updatedState[actions.targetName]);
            updatedState[actions.targetName].valid = validationPassed;
            return{
                ...state,
                [actions.formName]:updatedState
            }

        case actionsList.BLUR_HANDLE:
            const newStateData = {...state[actions.formName]};
            validationPassed = formValidate(actions.targetValue, newStateData[actions.targetName]);
            newStateData[actions.targetName].valid = validationPassed;
            newStateData[actions.targetName].touched = true;
            return{
                ...state,
                [actions.formName]:newStateData
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
                burgersIngredients:{
                    burger0:resetedIngredients}
            }

        case actionsList.LOGIN:
            localStorage.setItem('token', actions.tokenId);
            localStorage.setItem('userId', actions.userId);
            localStorage.setItem('userEmail', actions.userEmail);
            localStorage.setItem('expirationTime', new Date(new Date().getTime() + 3600 * 1000));
        return {
            ...state,
            logged:true
        };

        case actionsList.LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('expirationTime');
            return {
                ...state,
                logged:false
            };

        case actionsList.ISLOGGED:
            return {
                ...state,
                logged:true
            };

            default:
            return state;

        }
}

export default reducer;