import React from 'react';
import Button from '../../Tools/Button/Button';
import './BurgersList.css';
import {connect} from 'react-redux'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import bin from '../../../assets/img/bin.svg';
import * as actionsList from '../../../store/actions';

const BurgersList =(props)=>{
    let BurgersListBody = Object.entries(props.burgers).map((obj)=>{
        return (
            <CSSTransition classNames="fade-left" timeout={1300}>
                <li
                onClick={()=>props.switchBurger(obj[0])}
                key={obj[0]}
                id={obj[0]}
                className={obj[0] === props.currentBurger?'current':null}>

                </li>
            </CSSTransition>
        )
    });
    return(
        <div className="BurgersList">
            <TransitionGroup component="ul">
                {BurgersListBody}
            </TransitionGroup>
            <Button disableBtn={props.disableAddingButton} clicked={props.addBurger} btnType="success">Add burger</Button>
            <div
            className={Object.values(props.burgers).length === 1?'hidden':null}
            >
                <img onClick={()=>props.removeBurger(props.currentBurger)} className="close-btn" src={bin} alt=""/>
            </div>
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