import React, {Component} from 'react';
// import Burger from '../../components/Burger/Burger';
import CheckoutForm from '../../components/Forms/CheckoutForm/CheckoutForm';
import {connect} from 'react-redux';
import './Checkout.css';
import {Link} from 'react-router-dom';
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
    }

    finalizeOrderHandler=()=>{
        let allFormTrue = true;
        const stateFormData = {...this.props.formData};
		Object.values(stateFormData).map(x =>{
            if(!x.valid){
                allFormTrue = false;
            }
        })
        const order = {
            ingredients: this.props.ingredients,
            userData: {
                name: this.props.formData.name.value,
                address: this.props.formData.address.value,
                city: this.props.formData.city.value,
                phone: this.props.formData.phone.value,
                message: this.props.formData.message.value,
            },
            totalPrice: this.props.totalPrice
        }
        if(allFormTrue === true){
        this.setState(prevState=>{
            return {spinner:true}
         });
        axios.post('/orders.json', order)
        .then( response =>{
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
        let checkoutBody = <CheckoutForm blur={this.props.blurHandler} data={this.props.formData} change={this.props.inputChangeHandler}/>;

        let buttons = <div className="buttons text-center">
                          <Link className="btn info" to="/burger-builder">Back</Link>
                          <Button clicked={this.finalizeOrderHandler} btnType="success">Finish</Button>
                      </div>;
// disableBtn={!this.state.canFinish?true:false}
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
        // if(localStorage.getItem('token') === null){
        //     checkoutBody = <div><p>You have to be logged to see orders history!</p>
        //                         <Link className="btn info" to='/login'>Login</Link>
        //                     </div>;
        //     buttons= null;
        // }
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
        formData: state.checkoutForm,
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
        inputChangeHandler:(event)=>dispatch({type: actionsList.INPUT_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName: 'checkoutForm'}),
        blurHandler:(event)=>dispatch({type: actionsList.BLUR_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName: 'checkoutForm'}),
        resetValid:()=>dispatch({type: actionsList.RESET_VALID})
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);