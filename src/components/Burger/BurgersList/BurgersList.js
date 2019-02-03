import React from 'react';
import Button from '../../Tools/Button/Button';
import './BurgersList.css';
import {connect} from 'react-redux'
import Burger from '../Burger';
import bin from '../../../assets/img/bin.svg';
import * as actionsList from '../../../store/actions';

const BurgersList =(props)=>{
    let BurgersListBody = Object.entries(props.burgers).map((obj)=>{
        return (
            <li
            onClick={()=>props.switchBurger(obj[0])}
            key={obj[0]}
            id={obj[0]}
            className={obj[0] === props.currentBurger?'current':null}>
                <span className="circle">
                    {"#"+obj[0].substr(obj[0].length - 1)}
                </span>
                <span
                className={Object.values(props.burgers).length === 1?'hidden':null}
                onClick={()=>props.removeBurger(obj[0])}>
                    <img className="close-btn" src={bin} alt=""/>
                </span>
            </li>)
    });
    return(
        <div className="BurgersList">
            <ul>
                {BurgersListBody}
            </ul>
            <Button disableBtn={props.disableAddingButton} clicked={props.addBurger} customClass={'add-burger-btn'} btnType="success">+</Button>
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
		addBurger:()=> dispatch({type: actionsList.ADD_BURGER}),
        removeBurger: (targetBurger)=>{dispatch({type:actionsList.REMOVE_BURGER, targetBurger:targetBurger})},
        switchBurger: (pointedBurger)=>{dispatch({type:actionsList.SWITCH_BURGER, pointedBurger:pointedBurger})}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgersList);