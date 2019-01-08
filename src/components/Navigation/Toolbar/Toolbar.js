import React from 'react';
import './Toolbar.css';
import {NavLink} from 'react-router-dom';
import logo from '../../../assets/img/logo.png';

const Toolbar=()=>(
    <header>
        <NavLink to="/" ><img id="logo" src={logo} alt="Logo"/></NavLink>
        <div className="nav">
            <NavLink to="/burger-builder" >Burger Builder</NavLink>
            <NavLink to="/order-history" >Previous Orders</NavLink>
        </div>
    </header>
)

export default Toolbar;