import React from 'react';
import Burger from '../Burger';
import Hammer from 'react-hammerjs';

const BurgersPreview=(props)=>{
    const burgerPreviewContent = Object.entries(props.allIngredients).map(item=>{
        let thisClass = 'active';
        let burgerId = item[0].substr(item[0].length - 1);
        let currentBrg = props.currentBurger;
        currentBrg = currentBrg.substr(currentBrg.length - 1);
        burgerId = parseInt(burgerId);
        let positon = (currentBrg - burgerId) * 1500;

        const itemStyle = {
            left: positon,
        };
        return (
                <div style={itemStyle} id={item[0]+"Preview"} key={item[0]+"Preview"} className={thisClass+" BurgersPreviewItem"}>
                    <p>{item[0].split('_').join(' #')}</p>
                    <Burger positionClass={thisClass} ingredients={item[1]} />
                </div>
        );
    })

    return(
        <Hammer onSwipe={props.swipe}>
            <div className="BurgersPreview">
                {burgerPreviewContent}
                <p className="info">You can also use swipe to change burgers</p>
            </div>
        </Hammer>
    )

}

export default BurgersPreview;