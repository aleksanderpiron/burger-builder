import React from 'react';
import './CheckoutForm.css';

const CheckoutForm =(props)=>{
    return(
        <div className="form">
            <label id="name">
                <input type="text" onInput={props.validate} name='name' onChange={props.change} placeholder=' '/>
                <span>Name</span>
                <div className="error-mess">This field is required!</div>
            </label>
            <label id="address">
                <input type="text" onInput={props.validate} name='address' onChange={props.change} placeholder=' '/>
                <span>Address</span>
                <div className="error-mess"></div>
            </label>
            <label id="city">
                <input type="text" onInput={props.validate} name='city' onChange={props.change} placeholder=' '/>
                <span>City</span>
                <div className="error-mess"></div>
            </label>
            <label id="phone">
                <input type="tel" onInput={props.validate} pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" name='phone' onChange={props.change} placeholder=' '/>
                <span>Phone</span>
                <div className="error-mess"></div>
            </label>
            <label id="mess">
                <textarea name="mess" onInput={props.validate} cols="30" rows="10" onChange={props.change}  placeholder=' '></textarea>
                <span>Message (optional)</span>
                <div className="error-mess"></div>
            </label>
        </div>
    )
}

export default CheckoutForm;