import React from 'react';
import Burger from '../Burger';

const BurgersPreview=(props)=>{
    const burgerPreviewContent = Object.entries(props.allIngredients).map(item=>{
        let thisClass = 'active';
        let burgerId = item[0].substr(item[0].length - 1);
        burgerId = parseInt(burgerId);
        if(props.shownBurger > burgerId){
            thisClass = 'left';
        }
        if(props.shownBurger < burgerId){
            thisClass = 'right';
        }
        return (
            <div className={thisClass+" BurgersPreviewItem"}>
                <p>{item[0].split('_').join(' #')}</p>
                <Burger positionClass={thisClass} ingredients={item[1]} />
            </div>
        );
    })

    return(
        <div className="BurgersPreview">
            {burgerPreviewContent}
        </div>
    )

}

export default BurgersPreview;