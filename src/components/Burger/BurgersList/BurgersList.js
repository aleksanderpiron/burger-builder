import React from 'react';
import Button from '../../Tools/Button/Button';
import {connect} from 'react-redux'

const AddBurger =(props)=>{
    let BurgersListBody = Object.values(props.burgers).map((obj, index)=>{
        const targetName = 'burger' + index;
        return (<li onClick={()=>props.switchBurger(targetName)}>{targetName}</li>)
    });
    console.log(props.burgers);
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
        burgers: state.burgersIngredients
    }
}
export default connect(mapStateToProps)(AddBurger);