import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './components/HomePage/HomePage';
import * as actionsList from './store/actions';
import Login from './containers/Login/Login';

class App extends Component {
  checkIfLogged=()=>{
    if(localStorage.getItem('token')!==null){
      this.props.isLogged();
    }
  }
  render() {
    this.checkIfLogged();
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={HomePage}/>
          <Route path="/burger-builder" exact component={Layout}/>
          <Route path="/order-history" exact component={Layout}/>
          <Route path="/checkout" exact component={Layout}/>
        </div>
      </BrowserRouter>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    isLogged:()=>{dispatch({type:actionsList.ISLOGGED})}
  }
}

export default connect(null, mapDispatchToProps)(App);
