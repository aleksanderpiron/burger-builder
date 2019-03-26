import React, {Component} from 'react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import './Login.css';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actionsList from '../../store/actions';
import Spinner from '../../components/Tools/Spinner/Spinner';
import Button from '../../components/Tools/Button/Button';

class Login extends Component {
    state={
        changeForm:false,
        loading:false,
        registerError:false,
        loginError:false,
        logged:false,
        registerSuccess:false,
    }

    registerUserHandler=()=>{
        this.setState({loading:true});

        const formData = {
            email: this.props.registerForm.registerEmail.value,
            password: this.props.registerForm.registerPassword.value,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB1euGeZQ8S4E2FBzsowQn8wK_UriQg9-U', formData)
        .then(response=>{
            this.setState({loading:false, registerError:false, registerSuccess:true});
        })
        .catch(error=>{
            console.log(error);
            this.setState({loading:false, registerError:true});

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
        let loginContent = <LoginForm registerSuccess={this.state.registerSuccess} loginError={this.state.loginError} registerError={this.state.registerError} login={this.loginUserHandler} register={this.registerUserHandler} registerBlur={this.props.registerBlurHandler} loginBlur={this.props.loginBlurHandler} loginData={this.props.loginForm} registerData={this.props.registerForm} registerChange={this.props.registerInputChangeHandler} loginChange={this.props.loginInputChangeHandler} switch={this.switchHandler} changeForm={this.state.changeForm}/>;
        if(this.state.loading){
            loginContent = <Spinner />
        }
        if(this.props.logged || localStorage.getItem('token')!==null){
            loginContent = <div>
                <p>You are logged as {localStorage.getItem('userEmail')}</p>
                <Button clicked={this.props.logout}>Logout</Button>
                </div>
        }
        return(
            <div className="Login">
                <div className={'title-page'}>
					<h1>BURGER <span>BUILDER</span></h1>
				</div>
                {loginContent}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
	return{
        loginForm: state.loginForm,
        registerForm: state.registerForm,
        logged: state.logged
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
        loginInputChangeHandler:(event)=>dispatch({type: actionsList.INPUT_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName:'loginForm'}),
        registerInputChangeHandler:(event)=>dispatch({type: actionsList.INPUT_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName:'registerForm'}),
        loginBlurHandler:(event)=>dispatch({type: actionsList.BLUR_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName:'loginForm'}),
        registerBlurHandler:(event)=>dispatch({type: actionsList.BLUR_HANDLE, targetValue:event.target.value, targetName:event.target.name, formName:'registerForm'}),
        resetValid:()=>dispatch({type: actionsList.RESET_VALID}),
        login:(responseData)=>dispatch({type: actionsList.LOGIN, tokenId: responseData.idToken, userId: responseData.localId, userEmail: responseData.email}),
        logout:()=>dispatch({type: actionsList.LOGOUT})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);