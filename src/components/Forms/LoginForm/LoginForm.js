import React from 'react';
import Input from '../../Tools/Input/Input';
import Button from '../../Tools/Button/Button';
import '../Forms.css';

const LoginForm =(props)=>{
    
    let form = <div className="login">
                <h3 class="heading">Please enter e-mail and password</h3>
                <Input inputType="input" placeholder='E-mail'/>
                <Input inputType="input-password" placeholder='Password'/>

                <p onClick={props.switch}>Don't have account? Switch to register!</p>
                <Button btnType='success'>Login</Button>
            </div>
    if(props.changeForm){
        form = <div className="register">
                <h3 class="heading">Please enter the necessary information</h3>
                <Input inputType="input" placeholder='Login'/>
                <Input inputType="input-password" placeholder='Password'/>
                <Input inputType="input-password" placeholder='Repeat password'/>

                <p onClick={props.switch}>Already have account? Switch to login!</p>
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