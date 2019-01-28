import React, {Component} from 'react';
import './UserProfile.css';

class UserProfile extends Component{
    render(){
        const userToken = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');
        const userExpiration = localStorage.getItem('expirationTime');
        return(
            <div id="userProfile" class="wrapper">
                <div className="flex-box">
                    <div className="sidebar">
                        <h3>Your data: </h3>
                        <p>Email: {userEmail}</p>
                        <p>Id: {userId}</p>
                        <p>Expiration time of current session: {userExpiration}</p>
                    </div>
                    <div className="options">
                        <h3>Options: </h3>
                        <a href="">Change e-mail</a>
                        <a href="">Change password</a>
                        <a href="">Delete account</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;