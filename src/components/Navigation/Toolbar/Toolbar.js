import React from 'react';
import './Toolbar.css';
import {NavLink, Link} from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import * as actionsList from '../../../store/actions';
import {connect} from 'react-redux';

const Toolbar=(props)=>{
    let userEmail = localStorage.getItem('userEmail');
    let topContent = null
    if(userEmail !== null){
        topContent = <div>{userEmail} | <span onClick={props.logout}>Logout</span></div>
    }
    return(
    <header>
        <div>
        <NavLink to="/" ><img id="logo" src={logo} alt="Logo"/></NavLink>
            <div className="nav">
                <NavLink to="/burger-builder" >Burger Builder</NavLink>
                <NavLink to="/order-history" >Previous Orders</NavLink>
            </div>
        </div>
        <p className="user">{props.logged?topContent:<Link to="/">Login</Link>}</p>
    </header>
    )
}
const mapStateToProps = (state) =>{
	return{
        logged: state.logged
	}
}
const mapDispatchToProps = (dispatch) =>{
	return{
        logout:()=>dispatch({type: actionsList.LOGOUT})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);