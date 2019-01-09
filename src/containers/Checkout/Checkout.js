import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import {connect} from 'react-redux';
import './Checkout.css';
import {Link} from 'react-router-dom';
import Button from '../../components/Tools/Button/Button';

class Checkout extends Component{
    state = {
        values:{
            name:'',
            address:'',
            city:'',
            phone:'',
            mess:''
        },
        vaidation:{
            name:null,
            address:null,
            city:null,
            phone:null,
            message:null
        },
        errorMessages:{
            name:null,
            address:null,
            city:null,
            phone:null,
            message:null
        }
    }

    formValidate = (event) =>{
        const id = event.target.name;
        const updatedState = {...this.state};

        if(updatedState.values[id].length===0){
            updatedState.vaidation[id] = false;
        }
        else{
            updatedState.vaidation[id] = true;
        }
        console.log(updatedState)
    }
    inputChangeHandler = (event) =>{
        const value = event.target.value;
        const id = event.target.name;
        const updatedValues = {...this.state.values};
        updatedValues[id] = value;

        this.setState({values:updatedValues});
    }
    render(){
        return(
            <div className="checkout-page">
                {/* <div><Burger ingredients={this.props.ingredients} /></div> */}
                <CheckoutForm validate={this.formValidate} change={this.inputChangeHandler}/>
                <div className="buttons text-center">
                    <Link className="btn info" to="/burger-builder">Back</Link>
                    <Button btnType="success">Finish</Button>
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