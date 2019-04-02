import * as actionsList from './actions';

const INGREDIENT_PRICES = {
    tomato: 0.5,
	meat: 1.5,
	cheese: 0.4,
	bacon: 0.7,
	salad: 0.3
}

let newTotalPrice = null;
let ingPrice = null;
let validationPassed;
let updatedBurgerIng;
let newBurgerId = 1;
let emailCheckout = localStorage.getItem('userEmail') !==null?localStorage.getItem('userEmail'):'';


const initialState ={
    INGREDIENT_LIMITS:{
        tomato: 3,
        meat: 2,
        cheese: 4,
        bacon: 3,
        salad: 3
    },
    burgersIngredients:{
        burger_1: {
            bacon: 0,
            salad: 0,
            tomato: 0,
            cheese: 0,
            meat: 0,
        },
    },
    currentBurger:'burger_1',
    totalPrice: 3,
    logged:false,
    loginModalShowed: false,
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
        email:{
            value:emailCheckout,
            errorMessage:null,
            valid:false,
            validation:{
                notEmpty:false,
                isEmail:false
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
                isEmail:false,
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
                sameAsTarget: 'registerPassword',
                sameAs: false,
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
                isEmail:false,
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
        if(typeof updatedValidaton.validation.sameAs !== 'undefined'){
            const targetName = updatedValidaton.validation.sameAsTarget;
            let model = document.querySelector('input[name="'+targetName+'"]').value;
            if(value === model){
                updatedValidaton.validation.sameAs = true;
            }else if(value !== model){
                updatedValidaton.validation.sameAs = false;
            }
        }

        // IS EMAIL
        if(typeof updatedValidaton.validation.isEmail !== 'undefined'){
            if(value.indexOf('@') !== -1 && value.indexOf('.') !== -1){
                updatedValidaton.validation.isEmail = true;
            }else{
                updatedValidaton.validation.isEmail = false;
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
                    case 'isEmail':
                        updatedValidaton.errorMessage = "Email isn't correct!";
                    break;
                    case 'sameAs':
                        updatedValidaton.errorMessage = "Passwords aren't same";
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

            if(state.burgersIngredients[state.currentBurger][actions.ingName] < state.INGREDIENT_LIMITS[actions.ingName]){
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
        if(state.burgersIngredients[newCurrentBurger]===undefined){
            return state;
        }else{
            return {
                ...state,
                currentBurger:newCurrentBurger
            };
        }

        case actionsList.ADD_BURGER:
        newBurgerId++;
        const newBurgerName = "burger_"+newBurgerId;
        const newBurgerBody = {
            bacon: 0,
            salad: 0,
            tomato: 0,
            cheese: 0,
            meat: 0,
        }
        const updatedburgersIngredients = {
            ...state.burgersIngredients,
            [newBurgerName]: newBurgerBody,
        }
        return {
            ...state,
            burgersIngredients: updatedburgersIngredients,
            currentBurger: newBurgerName
        };

        case actionsList.REMOVE_BURGER:
        const burgersIng = {...state.burgersIngredients};
        let filtered = Object.assign(
            {},
            ...Object.entries(burgersIng)
               .filter(([k]) => k!== actions.targetBurger)
               .map(([k, v]) => ({[k]: v})));
               console.log(Object.keys(filtered)[0]);
        if(actions.targetBurger === state.currentBurger){
            const newCurrent= Object.keys(filtered)[0];
            return {
                ...state,
                currentBurger: newCurrent,
                burgersIngredients: filtered,
            };
        }else{
            return {
                ...state,
                burgersIngredients: filtered,
            };
        }

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
            const resetedValid = {...state[actions.resetedFormName]};
            const resetedIngredients = {
                burger_0:{
                    bacon: 0,
                    salad: 0,
                    tomato: 0,
                    cheese: 0,
                    meat: 0,
                }
            };
            Object.values(resetedValid).map(item=>{
                item.value = "";
                item.valid = false;
                item.touched = false;
                return item;
            });

            return{
                ...state,
                [actions.resetedFormName]:resetedValid,
                burgersIngredients:resetedIngredients,
                currentBurger:'burger_0',
            }

        case actionsList.LOGIN:
            localStorage.setItem('token', actions.tokenId);
            localStorage.setItem('userId', actions.userId);
            localStorage.setItem('userEmail', actions.userEmail);
            localStorage.setItem('expirationTime', new Date(new Date().getTime() + 3600 * 1000));
        return {
            ...state,
            logged:true,
            loginModalShowed:false,
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

        case actionsList.TOGGLE_LOGIN_MODAL:
        if(actions.toggleTo === true || actions.toggleTo === false){
                return{
                    ...state,
                    loginModalShowed:actions.toggleTo
                }
            }
            else{
                return {
                    ...state,
                    loginModalShowed: !state.loginModalShowed
                }
            };
        case actionsList.REORDER:
            const reorderData = actions.reorderData;
            const newCheckoutForm = {...state.checkoutForm};
            newCheckoutForm.address.value = reorderData.userData.address;
            newCheckoutForm.city.value = reorderData.userData.city;
            newCheckoutForm.message.value = reorderData.userData.message;
            newCheckoutForm.name.value = reorderData.userData.name;
            newCheckoutForm.phone.value = reorderData.userData.phone;
            newCheckoutForm.email.value = reorderData.userData.email;
            newCheckoutForm.address.touched = true;
            newCheckoutForm.city.touched = true;
            newCheckoutForm.message.touched = true;
            newCheckoutForm.name.touched = true;
            newCheckoutForm.phone.touched = true;
            newCheckoutForm.email.touched = true;
            newCheckoutForm.address.valid = true;
            newCheckoutForm.city.valid = true;
            newCheckoutForm.message.valid = true;
            newCheckoutForm.name.valid = true;
            newCheckoutForm.phone.valid = true;
            newCheckoutForm.email.valid = true;
            return {
                ...state,
                burgersIngredients:reorderData.ingredients,
                totalPrice: reorderData.totalPrice,
                checkoutForm: newCheckoutForm,
            };
            case actionsList.RESET_STATE:
            newTotalPrice = null;
            ingPrice = null;
            newBurgerId = 1;
            return {
                initialState
            };
            default:
            return state;

        }
}

export default reducer;