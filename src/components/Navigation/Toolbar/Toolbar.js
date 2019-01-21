import React from 'react';
import './Toolbar.css';
import {NavLink, Link} from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import * as actionsList from '../../../store/actions';
import {connect} from 'react-redux';

const Toolbar=(props)=>{
    let userEmail = localStorage.getItem('userEmail');
    console.log(props.logged);
    return(
    <header>
        <div>
        <NavLink to="/" ><img id="logo" src={logo} alt="Logo"/></NavLink>
            <div className="nav">
                <NavLink to="/burger-builder" >Burger Builder</NavLink>
                <NavLink to="/order-history" >Previous Orders</NavLink>
            </div>
        </div>
        <p onClick={props.logout} className="user">{props.logged?userEmail:<Link to="/">Log in</Link>}</p>
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