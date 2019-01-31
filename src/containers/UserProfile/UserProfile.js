import React, {Component} from 'react';
import './UserProfile.css';
import axios from 'axios';
import Button from '../../components/Tools/Button/Button';
import Input from '../../components/Tools/Input/Input';

class UserProfile extends Component{
    state = {
        changeEmail:false,
        changePassword:false,
        deleteAccound:false,
    }
    deleteAccoundHandler=()=>{
        const userId = localStorage.getItem('userId');
        const data = {
            idToken: userId
        }
        console.log(data);
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/deleteAccount?key=AIzaSyB1euGeZQ8S4E2FBzsowQn8wK_UriQg9-U', userId).then(response=>{
            console.log(response);
        }).catch(err=>{
            console.log(err);
        });

        // axios.delete('https://burgerbuilder-949ce.firebaseio.com/orders/'+userId+'.json').then(response=>{
        //     console.log(response);
        // }).catch(err=>{
        //     console.log(err);
        // });

    }
    changeEmailHandler=()=>{
        
    }
    changePasswordHandler=()=>{
        const dataToSend = {
            idToken: localStorage.getItem('userId'),
            password: document.getElementById('newPassword').value,
            returnSecureToken: true,
        }
        console.log(dataToSend)
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=AIzaSyB1euGeZQ8S4E2FBzsowQn8wK_UriQg9-U', dataToSend).then(response=>{
            console.log(response);
        }).catch(err=>{
            console.log(err);
        });
    }
    switchStateValue=(targetName)=>{
        const updatedState = {...this.state};
        updatedState[targetName] = !updatedState[targetName];

        this.setState(updatedState);
    }
    render(){
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');
        const userExpiration = localStorage.getItem('expirationTime');
        let optionsBody= (
            <div className="options">
                <h3>Options: </h3>
                <span onClick={()=>this.switchStateValue('changeEmail')}>Change e-mail</span>
                <span onClick={()=>this.switchStateValue('changePassword')}>Change password</span>
                <span onClick={()=>this.switchStateValue('deleteAccound')}>Delete account</span>
            </div>
        )
        if(this.state.changeEmail){
             optionsBody= (
                <div className="options">
                    <h3>Are you sure you want to delete this accound?: </h3>
                    <Button clicked={()=>this.switchStateValue('deleteAccound')} btnType="info">Cancel</Button>
                    <Button clicked={this.deleteAccoundHandler} btnType="danger">Delete</Button>
                </div>
            )
        }
        if(this.state.changePassword){
            optionsBody= (
               <div className="options">
                   <h3>Please enter your new password</h3>
                   <input id="newPassword" type="password"/>
                   <Button clicked={()=>this.changePasswordHandler()} btnType="info">Change</Button>
               </div>
           )
       }
       if(this.state.deleteAccound){
            optionsBody= (
                <div className="options">
                    <h3>Are you sure you want to delete this accound?: </h3>
                    <Button clicked={()=>this.switchStateValue('deleteAccound')} btnType="info">Cancel</Button>
                    <Button clicked={this.deleteAccoundHandler} btnType="danger">Delete</Button>
                </div>
            )
        }
        return(
            <div id="userProfile" className="wrapper">
                <div className="flex-box">
                    <div className="sidebar">
                        <h3>Your data: </h3>
                        <p>Email: {userEmail}</p>
                        <p>Id: {userId}</p>
                        <p>Expiration time of current session: {userExpiration}</p>
                    </div>
                    {optionsBody}
                </div>
            </div>
        )
    }
}

export default UserProfile;