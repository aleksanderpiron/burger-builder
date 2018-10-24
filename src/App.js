import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter, Route} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={HomePage}/>
          <Route path="/burger-builder" exact component={Layout}/>
          <Route path="/order-history" exact component={Layout}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
