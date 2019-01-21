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
            <img src={logo} alt=""/>
            <h1>{helloUser} Welcome to Burger Builder!</h1>
            <Link className="btn success" to="/burger-builder">Burger Builder</Link>
            <Link className="btn info" to="/order-history">History of orders</Link>
            <Login />
        </div>
    )
}

export default HomePage;