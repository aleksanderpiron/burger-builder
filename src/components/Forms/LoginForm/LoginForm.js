import React from 'react';
import Input from '../../Tools/Input/Input';
import Button from '../../Tools/Button/Button';
import '../Forms.css';

const LoginForm =(props)=>{

    let form = <div className="login">
                <h3 className="heading">Please enter e-mail and password</h3>
                <Input inputType="input" placeholder='E-mail' />
                <Input inputType="input-password" placeholder='Password'/>

                <p className="formChanger" onClick={props.switch}>Don't have account? Switch to register!</p>
                <Button btnType='success'>Login</Button>
            </div>
    if(props.changeForm){
        form = <div className="register">
                <h3 className="heading">Please enter the necessary information</h3>
                <Input inputType="input" placeholder='Login' touched={props.data.login.touched} valid={props.data.login.valid} onChange={props.change} onBlur={props.blur}  labelId="login" inputName="login"/>
                <Input inputType="input-password" placeholder='Password' touched={props.data.password.touched} valid={props.data.password.valid} onChange={props.change} onBlur={props.blur} labelId="password" inputName="password"/>
                <Input inputType="input-password" placeholder='Repeat password'  touched={props.data.repeat.touched} valid={props.data.repeat.valid} onChange={props.change} onBlur={props.blur} labelId="repeat" inputName="repeat"/>

                <p className="formChanger" onClick={props.switch}>Already have account? Switch to login!</p>
                <Button btnType='success'>Register</Button>
            </div>
    }

    return(
        <div className="form">
            {form}
        </div>
    )
}

export default LoginForm;