import React, { Component } from 'react';
import { connect } from 'react-redux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actionsList from './store/actions';

class App extends Component {
  checkIfLogged=()=>{
    if(localStorage.getItem('token')!==null){
      this.props.isLogged();
    }
  }
  componentDidMount(){
    this.checkIfLogged();
  }
  render() {
    return (
      <div className="App">
        <BurgerBuilder />
      </div>
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
