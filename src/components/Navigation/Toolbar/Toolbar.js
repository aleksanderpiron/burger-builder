import React from 'react';
import './Toolbar.css';
import {NavLink, Link} from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import * as actionsList from '../../../store/actions';
import {connect} from 'react-redux';

const Toolbar=(props)=>{
    let userEmail = localStorage.getItem('userEmail');
    console.log(userEmail);
    return(
    <header>
        <div>
        <NavLink to="/" ><img id="logo" src={logo} alt="Logo"/></NavLink>
            <div className="nav">
                <NavLink to="/burger-builder" >Burger Builder</NavLink>
                <NavLink to="/order-history" >Previous Orders</NavLink>
            </div>
        </div>
        <p onClick={props.logout} className="user">{userEmail?userEmail:<Link to="/login">Log in</Link>}</p>
    </header>
    )
}

const mapDispatchToProps = (dispatch) =>{
	return{
        logout:()=>dispatch({type: actionsList.LOGOUT})
	}
}

export default connect(null, mapDispatchToProps)(Toolbar);