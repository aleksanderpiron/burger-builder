import React from 'react';
import '../Forms.css';
import Input from '../../Tools/Input/Input';

const CheckoutForm =(props)=>{
    return(
        <div className="form">
                <Input touched={props.data.name.touched} valid={props.data.name.valid} errorMessage={props.data.name.errorMessage} inputType="input" labelId="name" placeholder="Name" inputName="name" onChange={props.change} onBlur={props.blur}/>

                <Input touched={props.data.address.touched} valid={props.data.address.valid} errorMessage={props.data.address.errorMessage} inputType="input" labelId="address" placeholder="Address" inputName="address" onChange={props.change} onBlur={props.blur}/>

                <Input touched={props.data.city.touched} valid={props.data.city.valid} errorMessage={props.data.city.errorMessage} inputType="input" labelId="city" placeholder="City" inputName="city" onChange={props.change} onBlur={props.blur}/>

                <Input touched={props.data.phone.touched} valid={props.data.phone.valid} errorMessage={props.data.phone.errorMessage} inputType="input" labelId="phone" placeholder="Phone" inputName="phone" onChange={props.change} onBlur={props.blur}/>

                <Input disableColors={true} touched={props.data.message.touched} valid={props.data.message.valid} errorMessage={props.data.message.errorMessage} inputType="textarea" labelId="mess" placeholder="Message (optional)" inputName="message" onChange={props.change} onBlur={props.blur}/>
        </div>
    )
}

export default CheckoutForm;