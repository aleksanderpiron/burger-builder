import React from 'react';
import Input from '../../Tools/Input/Input';
import Button from '../../Tools/Button/Button';
import '../Forms.css';

const LoginForm =(props)=>{

    let form = <div className="login">
                <h3 className="heading">Please enter e-mail and password</h3>
                <Input errorMessage={props.loginData.loginEmail.errorMessage} inputType="input" placeholder='E-mail' touched={props.loginData.loginEmail.touched} valid={props.loginData.loginEmail.valid} onChange={props.loginChange} onBlur={props.loginBlur}  labelId="loginEmail" inputName="loginEmail"/>
                <Input errorMessage={props.loginData.loginPassword.errorMessage} inputType="input-password" placeholder='Password' touched={props.loginData.loginPassword.touched} valid={props.loginData.loginPassword.valid} onChange={props.loginChange} onBlur={props.loginBlur}  labelId="loginPassword" inputName="loginPassword"/>
                <h3 className='error-message'>{props.loginError===true?'Invalid email or password!':null}</h3>
                <p className="formChanger" onClick={props.switch}>Don't have account? Switch to register!</p>
                <Button clicked={props.login} btnType='success'>Login</Button>
            </div>
    if(props.changeForm){
        form = <div className="register">
                <h3 className="heading">Please enter the necessary information</h3>
                <Input errorMessage={props.registerData.registerEmail.errorMessage} inputType="input" placeholder='E-mail' touched={props.registerData.registerEmail.touched} valid={props.registerData.registerEmail.valid} onChange={props.registerChange} onBlur={props.registerBlur}  labelId="registerEmail" inputName="registerEmail"/>
                <Input errorMessage={props.registerData.registerPassword.errorMessage} inputType="input-password" placeholder='Password' touched={props.registerData.registerPassword.touched} valid={props.registerData.registerPassword.valid} onChange={props.registerChange} onBlur={props.registerBlur} labelId="registerPassword" inputName="registerPassword"/>
                <Input errorMessage={props.registerData.repeat.errorMessage} inputType="input-password" placeholder='Repeat password'  touched={props.registerData.repeat.touched} valid={props.registerData.repeat.valid} onChange={props.registerChange} onBlur={props.registerBlur} labelId="repeat" inputName="repeat"/>

                <p className="formChanger" onClick={props.switch}>Already have account? Switch to login!</p>
                <Button clicked={props.register} btnType='success'>Register</Button>
            </div>
    }

    return(
        <div className="form">
            {form}
        </div>
    )
}

export default LoginForm;