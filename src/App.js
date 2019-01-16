 import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Route} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Login from './containers/Login/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={HomePage}/>
          <Route path="/burger-builder" exact component={Layout}/>
          <Route path="/order-history" exact component={Layout}/>
          <Route path="/checkout" exact component={Layout}/>
          <Route path="/login" exact component={Login}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
