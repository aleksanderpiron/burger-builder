import React from 'react';
import Button from '../../Tools/Button/Button';
import './BurgersList.css';
import {connect} from 'react-redux'
import Burger from '../Burger';
import cross from '../../../assets/img/close.svg';
import * as actionsList from '../../../store/actions';

const BurgersList =(props)=>{
    let BurgersListBody = Object.entries(props.burgers).map((obj)=>{
        return (<li id={obj[0]} className={obj[0] === props.currentBurger?'current':null}><div onClick={()=>props.switchBurger(obj[0])}><Burger ingredients={obj[1]}/></div><span className={Object.values(props.burgers).length === 1?'hidden':null} onClick={()=>props.removeBurger(obj[0])}><img className="close-btn" src={cross} alt=""/></span></li>)
    });
    return(
        <div className="BurgersList">
            <ul>
                {BurgersListBody}
            </ul>
            <Button disableBtn={props.disableAddingButton} clicked={props.addBurger} btnType="success">Add Burger</Button>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        burgers: state.burgersIngredients,
        currentBurger: state.currentBurger,
        disableAddingButton: state.blockAdding
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        removeBurger: (targetBurger)=>{dispatch({type:actionsList.REMOVE_BURGER, targetBurger:targetBurger})}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgersList);