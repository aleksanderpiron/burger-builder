import React from 'react';
import Login from '../../containers/Login/Login';
import './LoginModal.css';
import UserProfile from '../../containers/UserProfile/UserProfile';
import * as actionsList from '../../store/actions';
import {connect} from 'react-redux';

const LoginModal=(props)=>{
    let topContent = null;
    let userEmail = localStorage.getItem('userEmail');

    if(userEmail !== null){
        topContent = <div><span onClick={props.toggleModal} className="profileLink">{userEmail}</span> <span className="orange">|</span> <span onClick={props.logout}>Logout</span></div>;
    }
    return(
    <React.Fragment>
        <div className={props.loginModalShowed?'loginModal active':'loginModal'}>
            {props.logged?<UserProfile />:<Login />}
            {props.newOrder?<button className="closeModalBtn" onClick={()=>{props.toggleModal(false)}}></button>:null}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);