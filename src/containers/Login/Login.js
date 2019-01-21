import React, {Component} from 'react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import './Login.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import * as actionsList from '../../store/actions';
import Spinner from '../../components/Tools/Spinner/Spinner';

class Login extends Component {
    state={
        changeForm:false,
        loading:false,
        loginError:false,
        logged:false,
    }

    registerUserHandler=()=>{
        this.setState({loading:true});

        const formData = {
            email: this.props.registerForm.registerEmail.value,
            password: this.props.registerForm.registerPassword.value,
            returnSecureToken: true
        }
        console.log(formData);
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB1euGeZQ8S4E2FBzsowQn8wK_UriQg9-U', formData)
        .then(response=>{
            console.log(response);
            this.setState({loading:false});
        })
        .catch(error=>{
            console.log(error);
            this.setState({loading:false});

        });
    }

    loginUserHandler=()=>{
        this.setState({loading:true});
        const formData = {
            email: this.props.loginForm.loginEmail.value,
            password: this.props.loginForm.loginPassword.value,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB1euGeZQ8S4E2FBzsowQn8wK_UriQg9-U', formData)
        .then(response=>{
            this.props.login(response.data);
            console.log(response.data);
            this.setState({loading:false, loginError:false, logged:true});
        })
        .catch(error=>{
            console.log(error);
            this.setState({loading:false, loginError:true});
        });
    }

    switchHandler=()=>{
        this.setState(prevState=>{
           return {changeForm: !prevState.changeForm}
        })
    }

    render(){
        let loginContent = <LoginForm loginError={this.state.loginError} login={this.loginUserHandler} register={this.registerUserHandler} registerBlur={this.props.registerBlurHandler} loginBlur={this.props.loginBlurHandler} loginData={this.props.loginForm} registerData={this.props.registerForm} registerChange={this.props.registerInputChangeHandler} loginChange={this.props.loginInputChangeHandler} switch={this.switchHandler} changeForm={this.state.changeForm}/>;
        if(this.state.loading){
            loginContent = <Spinner />
        }
        if(this.state.logged){
            loginContent = <div><p>You are logged</p> <Redirect to="/"/></div>
        }
        return(
            <div className="Login">
                {loginContent}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
	return{
        loginForm: state.loginForm,
        registerForm: state.registerForm
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
        loginInputChangeHandler:(event)=>dispatch({type: actionsList.INPUT_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName:'loginForm'}),
        registerInputChangeHandler:(event)=>dispatch({type: actionsList.INPUT_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName:'registerForm'}),
        loginBlurHandler:(event)=>dispatch({type: actionsList.BLUR_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName:'loginForm'}),
        registerBlurHandler:(event)=>dispatch({type: actionsList.BLUR_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName:'registerForm'}),
        resetValid:()=>dispatch({type: actionsList.RESET_VALID}),
        login:(responseData)=>dispatch({type: actionsList.LOGIN, tokenId: responseData.idToken, userId: responseData.localId, userEmail: responseData.email})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);