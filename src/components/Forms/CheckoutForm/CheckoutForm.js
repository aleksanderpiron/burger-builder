import React from 'react';
import '../Forms.css';
import Input from '../../Tools/Input/Input';

const CheckoutForm =(props)=>{
    return(
        <div className="form">
                <Input inputData={props.formData.name} inputType="input" labelId="name" placeholder="Name" inputName="name" onChange={props.change} onBlur={props.blur}/>

                <Input inputData={props.formData.address} inputType="input" labelId="address" placeholder="Address" inputName="address" onChange={props.change} onBlur={props.blur}/>

                <Input inputData={props.formData.city} inputType="input" labelId="city" placeholder="City" inputName="city" onChange={props.change} onBlur={props.blur}/>

                <Input inputData={props.formData.email} inputType="input" labelId="email" placeholder="Email" inputName="email" onChange={props.change} onBlur={props.blur}/>

                <Input inputData={props.formData.phone} inputType="input" labelId="phone" placeholder="Phone" inputName="phone" onChange={props.change} onBlur={props.blur}/>

                <Input inputData={props.formData.message} disableColors={true} inputType="textarea" labelId="mess" placeholder="Message (optional)" inputName="message" onChange={props.change} onBlur={props.blur}/>

                <p className="error-message">{props.finalErrorMessage}</p>
        </div>
    )
}

export default CheckoutForm;