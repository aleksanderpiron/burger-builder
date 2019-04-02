import React from 'react';
import Burger from '../Burger';
import Hammer from 'react-hammerjs';

const BurgersPreview=(props)=>{
    const burgerPreviewContent = Object.entries(props.allIngredients).map((item, index)=>{
        let burgerId = parseInt(item[0].replace(/\D/g,''));
        let currentBrg = props.currentBurger;
        currentBrg = parseInt(currentBrg.substr(currentBrg.length - 1));
        let positon = (currentBrg - burgerId) * 1500;
        let thisClass = 'left';
        if(burgerId === currentBrg){
            thisClass = 'active';
        }
        if(positon > 0){
            thisClass = 'right';
        }
        return (
                <div id={item[0]+"Preview"} key={item[0]+"Preview"} className={thisClass+" BurgersPreviewItem"}>
                    <p>{'Burger #'+burgerId}</p>
                    <Burger positionClass={thisClass} ingredients={item[1]} />
                </div>
        );
    })

    return(
        <Hammer onSwipe={props.swipe}>
            <div className="BurgersPreview">
                {burgerPreviewContent}
            </div>
        </Hammer>
    )

}

export default BurgersPreview;