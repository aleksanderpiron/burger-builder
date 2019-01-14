import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from '../../assets/img/logo.png'

const HomePage = () =>{
    return (
        <div className="home">
            <img src={logo} alt=""/>
            <h1>Welcome to Burger Builder!</h1>
            <Link className="btn success" to="/burger-builder">Burger Builder</Link>
            <Link className="btn info" to="/order-history">History of orders</Link>
        </div>
    )
}

export default HomePage;