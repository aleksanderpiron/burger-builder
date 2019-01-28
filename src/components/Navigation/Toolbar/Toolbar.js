import React, {Component} from 'react';
import './Toolbar.css';
import {NavLink} from 'react-router-dom';
import Login from '../../../containers/Login/Login';
import logo from '../../../assets/img/logo.svg';
import * as actionsList from '../../../store/actions';
import {connect} from 'react-redux';

const Toolbar=(props)=>{
    let userEmail = localStorage.getItem('userEmail');
    let topContent = null
    if(userEmail !== null){
        topContent = <div><NavLink className="profileLink" to="/profile">{userEmail}</NavLink> <span className="orange">|</span> <span onClick={props.logout}>Logout</span></div>
    }
    return(
    <React.Fragment>
        <header>
            <div className='wrapper'>
                <div>
                <NavLink to="/" ><img id="logo" src={logo} alt="Logo"/></NavLink>
                    <div className="nav">
                        <NavLink to="/burger-builder" >Burger Builder</NavLink>
                        <NavLink to="/order-history" >Previous Orders</NavLink>
                    </div>
                </div>
                <p className="user">{props.logged?topContent:<span onClick={props.toggleModal}>Login</span>}</p>
            </div>
        </header>
                <div className={props.loginModalShowed?'loginModal active':'loginModal'}>
                    <Login />
                </div>
    </React.Fragment>
    )
}
const mapStateToProps = (state) =>{
	return{
        logged: state.logged,
        loginModalShowed: state.loginModalShowed
	}
}
const mapDispatchToProps = (dispatch) =>{
	return{
        logout:()=>dispatch({type: actionsList.LOGOUT}),
        toggleModal:()=>dispatch({type: actionsList.TOGGLE_LOGIN_MODAL}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);