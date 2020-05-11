import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// It si a wrapper for BrgerIngredient components.
const Burger = (props) => {
    console.log(props);
    // return an array of object's keys - transfroms object into an array.
    let transformedIngredients = Object.keys(props.ingredients)
     .map(igKey => {
         return [...Array(props.ingredients[igKey])]
         .map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />; 
            });
     })
     .reduce((previousValue, currentValue) => {
         return previousValue.concat(currentValue)        
     }, []);

     // .reduce - flat an array of array in one array. [[,,,], [,,,,]] = [,,,,,,,]
     console.log(transformedIngredients);

     if (transformedIngredients.length === 0) {
         transformedIngredients = <p>Please start adding ingredients!</p>
     }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}            
            <BurgerIngredient type="bread-bottom" />   
        </div>
    );
};


// logs for debging
// const Burger = (props) => {

//     console.log("Burger.js: props.ingredients", props);
//     console.log("Burger.js: Object.keys(props.ingredients)", Object.keys(props.ingredients));
//     // return an array of object's keys - transfroms object into an array.
//     const transformedIngredients = Object.keys(props.ingredients)
//      .map(igKey => {
//         console.log("Burger.js: [...Array(props.ingredients[igKey])]", [...Array(props.ingredients[igKey])]);
//          return [...Array(props.ingredients[igKey])]
//          .map((_, i) => {
//                 return <BurgerIngredient key={igKey + i} type={igKey} />; 
//             });
//      });

//     return (
//         <div className={classes.Burger}>
//             <BurgerIngredient type="bread-top" />
//             {transformedIngredients}            
//             <BurgerIngredient type="bread-bottom" />   
//         </div>
//     );
// };

export default Burger;