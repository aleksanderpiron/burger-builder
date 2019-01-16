import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import CheckoutForm from '../../components/Forms/CheckoutForm/CheckoutForm';
import {connect} from 'react-redux';
import './Checkout.css';
import {Link} from 'react-router-dom';
import Button from '../../components/Tools/Button/Button';
import axios from '../../axiosOrders';
import Spinner from '../../components/Tools/Spinner/Spinner';

class Checkout extends Component{
    state = {
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
            }
        },
        spinner:false,
        postStatus: 0,
        postError: null,
        canFinish:false,
    }

    formValidate = (value, updatedValidaton) =>{
        let validationPassed = true;

        // RULES START
        // NOT EMPTY
        if(typeof updatedValidaton.validation.notEmpty != 'undefined'){
            if(value.trim().length > 0){
                updatedValidaton.validation.notEmpty = true;
            }else if(value.trim().length === 0){
                updatedValidaton.validation.notEmpty = false;
            }
        }

        // NOT TOO SHORT
        if(typeof updatedValidaton.validation.minLength != 'undefined'){
            value = value.replace(/\s+/g, '');
            if(value.trim().length >= updatedValidaton.validation.minLengthNum){
                updatedValidaton.validation.minLength = true;
            }else if(value.trim().length >= 1){
                updatedValidaton.validation.minLength = false;
            }
        }

        // IS NUMBER
        if(typeof updatedValidaton.validation.isNumber != 'undefined'){
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
                }
            }
        }
        return validationPassed;
        }

    inputChangeHandler = (event) =>{
        const updatedState = {...this.state};
        updatedState.formData[event.target.name].value = event.target.value;
        const validationPassed = this.formValidate(event.target.value, updatedState.formData[event.target.name]);
        updatedState.formData[event.target.name].valid = validationPassed;
        this.setState(updatedState);
    }

    blurHandler = (event) =>{
        const newStateData = {...this.state.formData}
        const validationPassed = this.formValidate(event.target.value, newStateData[event.target.name]);
        newStateData[event.target.name].valid = validationPassed;
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
                },
                totalPrice: this.props.totalPrice
            }

        if(allFormTrue === true){
            this.setState(prevState=>{
                return {spinner:true}
             });
            axios.post('/orders.json', order)
            .then( response =>{
                console.log(response);
                if(response.status === 200){
                    this.setState(prevState=>{
                       return {spinner:false,
                                postStatus:response.status
                    }
                    })
                }
            }
            )
            .catch( error =>
                this.setState(prevState=>{
                    return {postError:error
                 }
                 })
            );
        }else{
            console.log('Fill form!')
        }
    }

    render(){
        let checkoutBody = <CheckoutForm blur={this.blurHandler} data={this.state.formData} errorMessage={this.state.errorMessage} change={this.inputChangeHandler}/>;

        let buttons = <div className="buttons text-center">
                          <Link className="btn info" to="/burger-builder">Back</Link>
                          <Button disableBtn={!this.state.canFinish?true:false} clicked={this.finalizeOrderHandler} btnType="success">Finish</Button>
                      </div>;

        if(this.state.spinner === true){
            checkoutBody = <Spinner />
            buttons = null
        }
        if(this.state.postStatus === 200){
            checkoutBody = <p>Your order has been successfully placed</p>
            buttons = <div className="buttons text-center">
                            <Link className="btn info" to="/">Homepage</Link>
                        </div>;
        }
        if(this.state.postError !== null){
            checkoutBody = <p>Something went wrong!</p>;
            buttons = null;
            console.log(this.state.postError);
        }
        return(
            <div className="checkout-page">
                {/* <div><Burger ingredients={this.props.ingredients} /></div> */}
                {checkoutBody}
                {buttons}
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