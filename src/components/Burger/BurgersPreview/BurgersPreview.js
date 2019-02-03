import React from 'react';
import Burger from '../Burger';

const BurgersPreview=(props)=>{
    const burgerPreviewContent = Object.entries(props.allIngredients).map(item=>{
        let thisClass = 'active';
        let burgerId = item[0].substr(item[0].length - 1);
        let currentBrg = props.currentBurger;
        currentBrg = currentBrg.substr(currentBrg.length - 1);
        burgerId = parseInt(burgerId);
        if(currentBrg > burgerId){
            thisClass = 'left';
        }
        if(currentBrg < burgerId){
            thisClass = 'right';
        }
        return (
            <div key={item[0]+"Preview"} className={thisClass+" BurgersPreviewItem"}>
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