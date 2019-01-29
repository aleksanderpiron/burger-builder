import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './components/HomePage/HomePage';
import * as actionsList from './store/actions';

class App extends Component {
  checkIfLogged=()=>{
    if(localStorage.getItem('token')!==null){
      this.props.isLogged();
    }
  }
    
  render() {
    // this.checkIfLogged();
    let routes = (
      <Switch>
        <Route path="/burger-builder" exact component={Layout}/>
        <Route path="/" exact component={HomePage}/>
        <Redirect to="/"/>
      </Switch>
    )
    if(this.props.logged){
      routes= (<Switch>
        <Route path="/burger-builder" exact component={Layout}/>
        <Route path="/order-history" exact component={Layout}/>
        <Route path="/checkout" exact component={Layout}/>
        <Route path="/profile" exact component={Layout}/>
        <Route path="/" exact component={HomePage}/>
        <Redirect to="/"/>
      </Switch>)
    }
    
    return (
      <BrowserRouter>
        <div className="App">
            {routes}
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
const mapStateToProps=(state)=>{
  return{
    logged:state.logged
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
