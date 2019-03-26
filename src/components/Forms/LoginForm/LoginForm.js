import React from 'react';
import Input from '../../Tools/Input/Input';
import Button from '../../Tools/Button/Button';
import {CSSTransition} from 'react-transition-group';
import '../Forms.css';

const LoginForm =(props)=>{

    let form = <div className="login">
                    <h4 className="heading">Please enter e-mail and password to sign in</h4>
                    <Input disableColors={true} inputData={props.loginData.loginEmail} inputType="input" placeholder='E-mail' onChange={props.loginChange} onBlur={props.loginBlur}  labelId="loginEmail" inputName="loginEmail"/>
                    <Input disableColors={true} inputData={props.loginData.loginPassword} inputType="input-password" placeholder='Password' onChange={props.loginChange} onBlur={props.loginBlur}  labelId="loginPassword" inputName="loginPassword"/>
                    <h3 className='error-message'>{props.loginError===true?'Invalid email or password!':null}</h3>
                    <p className="formChanger" onClick={props.switch}>Don't have account? Switch to register!</p>
                    <Button clicked={props.login} btnType='success full-width'>Login</Button>
                </div>
    if(props.changeForm){
        form =
            <CSSTransition classNames={'fade-left'} mountOnEnter unmountOnExit timeout={500} in={true}>
                <div className="register">
                    <h4 className="heading">Please enter the necessary information to sign up</h4>
                    <Input inputData={props.registerData.registerEmail} inputType="input" placeholder='E-mail' onChange={props.registerChange} onBlur={props.registerBlur}  labelId="registerEmail" inputName="registerEmail"/>
                    <Input inputData={props.registerData.registerPassword} inputType="input-password" placeholder='Password' onChange={props.registerChange} onBlur={props.registerBlur} labelId="registerPassword" inputName="registerPassword"/>
                    <Input inputData={props.registerData.repeat} inputType="input-password" placeholder='Repeat password' onChange={props.registerChange} onBlur={props.registerBlur} labelId="repeat" inputName="repeat"/>
                    <h3 className='error-message'>{props.registerError===true?'Provided informations are incorrect!':null}</h3>
                    <p className="formChanger" onClick={props.switch}>Already have account? Switch to login!</p>
                    <Button clicked={props.register} btnType='success full-width'>Register</Button>
                </div>
            </CSSTransition>
    }
    if(props.registerSuccess){
        <div className="login">
            <h4 className="heading text-success">Registration was successful! Now you can login</h4>
            <Input disableColors={true} inputData={props.loginData.loginEmail} inputType="input" placeholder='E-mail' onChange={props.loginChange} onBlur={props.loginBlur}  labelId="loginEmail" inputName="loginEmail"/>
            <Input disableColors={true} inputData={props.loginData.loginPassword} inputType="input-password" placeholder='Password' onChange={props.loginChange} onBlur={props.loginBlur}  labelId="loginPassword" inputName="loginPassword"/>
            <h3 className='error-message'>{props.loginError===true?'Invalid email or password!':null}</h3>
            <p className="formChanger" onClick={props.switch}>Don't have account? Switch to register!</p>
            <Button clicked={props.login} btnType='success full-width'>Login</Button>
        </div>
    }

    return(
        <div className="form">
            {form}
        </div>
    )
}

export default LoginForm;