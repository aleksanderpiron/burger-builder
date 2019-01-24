import React from 'react';
import Button from '../../Tools/Button/Button';
import './BurgersList.css';
import {connect} from 'react-redux'
import Burger from '../Burger';
import cross from '../../../assets/img/close.svg';
import * as actionsList from '../../../store/actions';

const AddBurger =(props)=>{
    let BurgersListBody = Object.values(props.burgers).map((obj, index)=>{
        const targetName = 'burger' + index;
        return (<li id={targetName} className={targetName === props.currentBurger?'current':null} onClick={()=>props.switchBurger(targetName)}><Burger ingredients={props.burgers[targetName]} /><span className={Object.values(props.burgers).length === 1?'hidden':null} onClick={()=>props.removeBurger(targetName)}><img className="close-btn" src={cross} alt=""/></span></li>)
    });
    console.log(Object.values(props.burgers).length);
    return(
        <div className="BurgersList">
            <ul>
                {BurgersListBody}
            </ul>
            <Button clicked={props.addBurger} btnType="success">Add Burger</Button>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        burgers: state.burgersIngredients,
        currentBurger: state.currentBurger
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        removeBurger: (targetBurger)=>{dispatch({type:actionsList.REMOVE_BURGER, targetBurger:targetBurger})}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddBurger);