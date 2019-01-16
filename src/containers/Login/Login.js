import React, {Component} from 'react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import './Login.css';

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
                <LoginForm switch={this.switchHandler} changeForm={this.state.changeForm}/>
            </div>
        )
    }
}

export default Login;