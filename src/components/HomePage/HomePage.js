import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomePage.css';
import logo from '../../assets/img/logo.svg'
import Login from '../../containers/Login/Login';

const HomePage = (props) =>{
    let helloUser = null;
    if(localStorage.getItem('token') !== null || props.logged){
        let userName = localStorage.getItem('userEmail');
        const index = userName.indexOf('@');
        userName = userName.slice(0, index);
        helloUser = <span>Hello {userName}!<br /></span>
    }
    return (
        <div className="home">
            <div className="home-body">
            <img id="main_logo" src={logo} alt=""/>
            <div className="bg"></div>
                <div className="home-content">
                    <p className="main-subheading">{helloUser}</p>
                    <p className="main-heading"> Welcome to Kings Burger!</p>
                    <Link className="btn info" to="/burger-builder">Order Burgers</Link>
                    <Login />
                </div>
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>{
    return{
      logged:state.logged
    }
  }

export default connect(mapStateToProps)(HomePage);