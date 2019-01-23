import React from 'react';
import Button from '../../Tools/Button/Button';
import {connect} from 'react-redux'

const AddBurger =(props)=>{
    // let BurgersListBody = null;
    return(
        <div className="BurgersList">
            <ul>
                
            </ul>
            <Button btnType="success">Add Burger</Button>
        </div>
    )
}

// mapStateToProps=state=>{
//     return(
//         ing
//     )
// }
export default AddBurger;