import React from 'react';
import {CSSTransition} from 'react-transition-group';

const Notification=(props)=>{
    let notiClasses = "notification";
    switch(props.notiType){
        case 'red':
            notiClasses = "notification red";
        break;
        case 'orange':
            notiClasses = "notification orange";
        break;
        case 'blue':
            notiClasses = "notification blue";
        break;
        default:
            return notiClasses;
    }
    return(
		<CSSTransition classNames={'slide-right'} unmountOnExit timeout={1200} in={props.visible}>
            <div className={notiClasses} onClick={props.clicked}>
                <div className="icon"></div>
                <div className="text">
                    <p>{props.notiMessage}</p>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Notification;