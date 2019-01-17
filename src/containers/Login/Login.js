import React, {Component} from 'react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import './Login.css';
import {connect} from 'react-redux';
import * as actionsList from '../../store/actions';

class Login extends Component {
    state={
        changeForm:false,
    }

    switchHandler=()=>{
        this.setState(prevState=>{
           return {changeForm: !prevState.changeForm}
        })
    }

    render(){
        return(
            <div className="Login">
                <LoginForm blur={this.props.blurHandler} data={this.props.formData} change={this.props.inputChangeHandler} switch={this.switchHandler} changeForm={this.state.changeForm}/>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
	return{
        formData: state.formData,
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
        inputChangeHandler:(event)=>dispatch({type: actionsList.INPUT_HANDLE, targetValue:event.target.value, targetName:event.target.name}),
        blurHandler:(event)=>dispatch({type: actionsList.BLUR_HANDLE, targetValue:event.target.value, targetName:event.target.name}),
        resetValid:()=>dispatch({type: actionsList.RESET_VALID})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);