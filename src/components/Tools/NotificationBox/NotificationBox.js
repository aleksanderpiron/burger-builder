import React from 'react';
import './NotificationBox.css';
import Notification from '../Notification/Notification';

const NotificationBox=(props)=>{
    let notifiList = Object.values(props.errorsList).map(item=>{
        return(
        <li>
            <Notification clicked={item.clickFunction} visible={item.status} notiType={item.errType} notiMessage={item.errMessage}/>
        </li>
        )
    })
    return(
        <ul className='notiBox'>
            {notifiList}
        </ul>
    )
}

export default NotificationBox;