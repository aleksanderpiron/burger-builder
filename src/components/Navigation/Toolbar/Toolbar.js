import React from 'react';
import './Toolbar.css';
import {NavLink} from 'react-router-dom';
import Login from '../../../containers/Login/Login';
import UserProfile from '../../../containers/UserProfile/UserProfile';
import logo from '../../../assets/img/logo.svg';
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
        <NavLink to="/" ><img id="logo" src={logo} alt="Logo"/></NavLink>
        <div className="user">{props.logged?topContent:<span onClick={props.toggleModal}>
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 299.997 299.997" width="30" height="30"><path d="M149.996,0C67.157,0,0.001,67.158,0.001,149.997c0,82.837,67.156,150,149.995,150s150-67.163,150-150 C299.996,67.156,232.835,0,149.996,0z M150.453,220.763v-0.002h-0.916H85.465c0-46.856,41.152-46.845,50.284-59.097l1.045-5.587 c-12.83-6.502-21.887-22.178-21.887-40.512c0-24.154,15.712-43.738,35.089-43.738c19.377,0,35.089,19.584,35.089,43.738 c0,18.178-8.896,33.756-21.555,40.361l1.19,6.349c10.019,11.658,49.802,12.418,49.802,58.488H150.453z" fill="#fff" /></svg>
        </span>}
        </div>
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