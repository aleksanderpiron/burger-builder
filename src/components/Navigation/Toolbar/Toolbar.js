import React from 'react';
import './Toolbar.css';
import {Link} from 'react-router-dom';
import logo from '../../../assets/img/logo.png';

const Toolbar=()=>(
    <header>
        <Link to="/" ><img id="logo" src={logo} alt="Logo"/></Link>
        <div className="nav">
            <Link to="/burger-builder" >Burger Builder</Link>
            <Link to="/order-history" >Previous Orders</Link>
        </div>
    </header>
)

export default Toolbar;