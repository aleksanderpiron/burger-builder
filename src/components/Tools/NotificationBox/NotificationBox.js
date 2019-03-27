import React from 'react';
import './NotificationBox.css';
import Notification from '../Notification/Notification';
import {CSSTransition} from 'react-transition-group';

const NotificationBox=(props)=>{
    let notifiList = Object.values(props.notificationList).map(item=>{
        return(
		<CSSTransition classNames={'slide-right'} mountOnEnter unmountOnExit timeout={1200} in={item.status}>
            <li>
                <Notification clicked={item.clickFunction} visible={item.status} notiType={item.notiType} notiMessage={item.notiMessage}/>
            </li>
        </CSSTransition>
        )
    })
    return(
        <ul className='notiBox'>
            {notifiList}
        </ul>
    )
}

export default NotificationBox;