import React, {Component} from 'react';
import './Layout2.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Checkout from '../Checkout/Checkout';

class Layout2 extends Component{
    state = {
        driverState:false,
        step:1,
      };
    
      nextStepHandler=()=>{
        let newStep = this.state.step;
        newStep++;
        this.setState(prevState=>{
          return {
            driverState: !prevState.driverState,
             step:newStep}
        })
      }
      prevStepHandler=()=>{
        let newStep = this.state.step;
        newStep--;
        this.setState(prevState=>{
          return {
            driverState: !prevState.driverState,
             step:newStep}
        })
      }
      render() {
        let leftContent = 
        <div className="step-one">
            <h2>Step one</h2>
            <button onClick={this.nextStepHandler}>Next step</button>
        </div>;
        let rightContent = 
        <div className="step-two">
            <h2>Step two</h2>
            <button onClick={this.nextStepHandler}>Next step</button>
        </div>;
        if(this.state.step>2){
          leftContent = 
          <div className="step-three">
            <h2>Step three</h2>
            <button onClick={this.nextStepHandler}>Next step</button>
          </div>;
        }
        if(this.state.step>3){
          rightContent = 
          <div className="step-four">
            <h2>Step four</h2>
            <Checkout />
            <button onClick={this.nextStepHandler}>Next step</button>
          </div>;
          }
        if(this.state.step>4){
          leftContent = 
          <div className="step-five">
            <h2>Step five</h2>
          </div>;
        }
        return(
            <div id="main">
                <div className={this.state.driverState?'curtain left-pos':'curtain'}></div>
                <div className="step-box flex-box">
                    {leftContent}
                    {rightContent}
                </div>
            </div>
        )
    }
}
export default Layout2;