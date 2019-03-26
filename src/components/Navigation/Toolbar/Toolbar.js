import React from 'react';
import './Toolbar.css';
import {NavLink} from 'react-router-dom';
import Login from '../../../containers/Login/Login';
import UserProfile from '../../../containers/UserProfile/UserProfile';
import * as actionsList from '../../../store/actions';
import {connect} from 'react-redux';

const Toolbar=(props)=>{
    let userEmail = localStorage.getItem('userEmail');
    let topContent = null;

    if(userEmail !== null){
        topContent = <div><span onClick={props.toggleModal} className="profileLink">{userEmail}</span> <span className="orange">|</span> <span onClick={props.logout}>Logout</span></div>;
    }
    return(
    <React.Fragment>
        <div className={props.loginModalShowed?'loginModal active':'loginModal'}>
            {props.logged?<UserProfile />:<Login />}
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