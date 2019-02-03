import React, {Component} from 'react';
import CheckoutForm from '../../components/Forms/CheckoutForm/CheckoutForm';
import {connect} from 'react-redux';
import './Checkout.css';
import {Link} from 'react-router-dom';
import Login from '../../containers/Login/Login';
import Button from '../../components/Tools/Button/Button';
import axios from '../../axiosOrders';
import Spinner from '../../components/Tools/Spinner/Spinner';
import * as actionsList from '../../store/actions';

class Checkout extends Component{
    state = {
        spinner:false,
        postStatus: 0,
        postError: null,
        canFinish:false,
        finalErrorMessage:null
    }

    formCorrectCheck=()=>{
        let allFormTrue = true;
        const stateFormData = {...this.props.formData};
		Object.values(stateFormData).map(x =>{
            if(!x.valid){
                allFormTrue = false;
            }
                return allFormTrue;
        })
        if(allFormTrue){
            return true;
        }else{
            return false;
        }
    }

    finalizeOrderHandler=()=>{
        const order = {
            ingredients: this.props.ingredients,
            userData: {
                name: this.props.formData.name.value,
                address: this.props.formData.address.value,
                city: this.props.formData.city.value,
                email: this.props.formData.email.value,
                phone: this.props.formData.phone.value,
                message: this.props.formData.message.value,
            },
            totalPrice: this.props.totalPrice
        }
        if(this.formCorrectCheck()){
        this.setState(prevState=>{
            return {spinner:true}
         });
         let address = localStorage.getItem('userId');
         address = 'orders/'+address+'.json';
        axios.post(address, order)
        .then( response =>{
            if(response.status === 200){
                this.props.resetValid();
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
            this.setState({finalErrorMessage:'Form contains invalid values! Please correct them'})
        }
    }
    render(){
        let checkoutBody =
            <div>
                <h2>Almost there!</h2>
                <h4>Fill necessary information for delivery your order</h4>
                <CheckoutForm finalErrorMessage={this.state.finalErrorMessage} blur={this.props.blurHandler} formData={this.props.formData} change={this.props.inputChangeHandler}/>
            </div>;

        let buttons = <div className="buttons text-center">
                          <Button clicked={this.props.prevStep} btnType="info">Back</Button>
                          <Button clicked={this.finalizeOrderHandler} disableBtn={!this.formCorrectCheck()} btnType="success">Finish</Button>
                      </div>;
        if(this.state.spinner === true){
            checkoutBody = <Spinner />
            buttons = null
        }
        if(this.state.postStatus === 200){
            checkoutBody = <p>Your order has been successfully placed<br /> Thank you!</p>
            buttons = <div className="buttons text-center">
                            <Link className="btn info" to="/">Homepage</Link>
                        </div>;
        }
        if(this.state.postError !== null){
            checkoutBody = <p>Something went wrong!</p>;
            buttons = null;
        }
        if(localStorage.getItem('token') === null){
            checkoutBody = <div><p class="text-center">You have to be logged to see orders history!</p>
                <Login />
                 </div>
            buttons= null;
        }
        return(
            <div className="checkout-page">
                {checkoutBody}
                {buttons}
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
	return{
		ingredients: state.burgersIngredients,
        totalPrice: state.totalPrice,
        formData: state.checkoutForm,
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
        inputChangeHandler:(event)=>dispatch({type: actionsList.INPUT_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName: 'checkoutForm'}),
        blurHandler:(event)=>dispatch({type: actionsList.BLUR_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName: 'checkoutForm'}),
        resetValid:()=>dispatch({type: actionsList.RESET_VALID, resetedFormName: 'checkoutForm'})
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);