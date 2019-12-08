import React, { Component } from 'react';

import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxiliary';

class OrderSummary extends Component {
    // This should be a functional component, doesn't have to be a class
    componentDidUpdate() {
        console.log('[OrderSummary] DidUpdate');
    }

    render () {
        // this a uotput I wanna have at the end
        // <li>Salad: 1</li>

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                // key is require for every child element
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li> );
        });

        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the fallowing ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continoe with checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        );
    }
}

export default OrderSummary;