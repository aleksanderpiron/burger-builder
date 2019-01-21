import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from '../../assets/img/logo.png'
import Login from '../../containers/Login/Login';

const HomePage = () =>{
    let helloUser = null;
    if(localStorage.getItem('token') !== null){
        let userName = localStorage.getItem('userEmail');
        const index = userName.indexOf('@');
        userName = userName.slice(0, index);
        helloUser = <span>Hello {userName}!<br /></span>
    }
    return (
        <div className="home">
            <div className="mask"></div>
            <div className="home-body">
            <div className="bg"></div>
                <div className="home-content">
                    {/* <img src={logo} alt=""/> */}
                    <h1>{helloUser} Welcome to Burger Builder!</h1>
                    <Link className="btn info" to="/burger-builder">Order Burger</Link>
                    <Link className="btn info" to="/order-history">Show History</Link>
                    <Login />
                </div>
            </div>
        </div>
    )
}

export default HomePage;