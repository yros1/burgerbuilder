import React from 'react';

import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                // key is require for every child element
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li> );
        })    
    // this a uotput I wanna have at the end
    // <li>Salad: 1</li>
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the fallowing ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continoe with checkout?</p>
            <button onClick={props.cancelButonClicked}>CANCEL</button>
            <button>CONTINUE</button>
        </Aux>
    );
};

export default orderSummary;