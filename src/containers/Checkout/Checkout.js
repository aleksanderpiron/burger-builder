import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import {connect} from 'react-redux';
import './Checkout.css';
import {Link} from 'react-router-dom';
import Button from '../../components/Tools/Button/Button';
import axios from '../../axiosOrders';


class Checkout extends Component{
    state = {
        formData:{
            name:{
                value:'',
                errorMessage:'Error!',
                valid:false,
                validation:{
                    notEmpty:false,
                    minLength:false,
                    minLengthNum:3
                },
                touched:false
            },
            address:{
                value:'',
                errorMessage:'Error!',
                valid:false,
                validation:{
                    notEmpty:false,
                    minLength:false,
                    minLengthNum:1
                },
                touched:false
            },
            city:{
                value:'',
                errorMessage:'Error!',
                valid:false,
                validation:{
                    notEmpty:false,
                    minLength:false,
                    minLengthNum:1
                },
                touched:false
            },
            phone:{
                value:'',
                errorMessage:'Error!',
                valid:false,
                validation:{
                    notEmpty:false,
                    minLength:false,
                    minLengthNum:9
                },
                touched:false
            },
            message:{
                value:'',
                errorMessage:'Error!',
                valid:false,
                validation:{
                    notEmpty:false,
                    minLength:false,
                    minLengthNum:1
                },
                touched:false
            }
        },
    }
    formValidate = (value, updatedValidaton) =>{
        let validationPassed = true;
        if(value.trim().length > 0){
            updatedValidaton.notEmpty = true;
        }else{
            updatedValidaton.notEmpty = false;
        }

        if(value.trim().length >= updatedValidaton.minLengthNum){
            updatedValidaton.minLength = true;
        }else{
            updatedValidaton.minLength = false;
        }
        
        for(var o in updatedValidaton){
            if(!updatedValidaton[o]){
                validationPassed = false;
            }   
        }
        return validationPassed;
        }

    inputChangeHandler = (event) =>{
        const updatedState = {...this.state};
        updatedState.formData[event.target.name].value = event.target.value;
        const validationPassed = this.formValidate(event.target.value, updatedState.formData[event.target.name].validation);
        updatedState.formData[event.target.name].valid = validationPassed;
        this.setState(updatedState);
    }

    blurHandler = (event) =>{
        const newStateData = {...this.state.formData}
        newStateData[event.target.name].touched = true;
        this.setState({formData:newStateData});
    }

    finalizeOrderHandler=()=>{
        let allFormTrue = true;
        const stateFormData = {...this.state.formData};
		Object.values(stateFormData).map(x =>{
            if(!x.valid){
                allFormTrue = false;
            }
        })
        const order = {
            ingredients: this.props.ingredients,
            userData: {
                name: this.state.formData.name.value,
                address: this.state.formData.address.value,
                city: this.state.formData.city.value,
                phone: this.state.formData.phone.value,
                message: this.state.formData.message.value,
            }
        }
        console.log(order);
    }
    
    render(){
        return(
            <div className="checkout-page">
                {/* <div><Burger ingredients={this.props.ingredients} /></div> */}
                <CheckoutForm blur={this.blurHandler} data={this.state.formData} errorMessage={this.state.errorMessage} errorMessageStatus={this.state.validation} change={this.inputChangeHandler}/>
                <div className="buttons text-center">
                    <Link className="btn info" to="/burger-builder">Back</Link>
                    <Button clicked={this.finalizeOrderHandler} btnType="success">Finish</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
	return{
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
	}
}
export default connect(mapStateToProps)(Checkout);