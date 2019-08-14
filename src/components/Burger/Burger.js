import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// It si a wrapper for BrgerIngredient components.
const Burger = (props) => {
    // return an array of object's keys - transfroms object into an array.
    const transformedIngredients = Object.keys(props.ingredients)
     .map(igKey => {
         return [...Array(props.ingredients[igKey])]
         .map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />; 
            });
     });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}            
            <BurgerIngredient type="bread-bottom" />   
        </div>
    );
};

export default Burger;