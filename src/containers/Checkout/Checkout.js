import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    
    state = {  
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        // extract QeryParameters
        // console.log(this.props.location);
        // URLSearchParams convets string '?bacon=2&cheese=2&meat=1&salad=2' 
        // to array [['bacon', '2'], ['cheese', '2'], ['meat', '1'], ['salad', '2']
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            // ['salad', '1']
            ingredients[param[0]] = +param[1]; // by adding plus before param[1], we convert it to be a number
        }
        this.setState({ingredients: ingredients});
    }

    checkoutCancelledHandler = () => {
        // navigate to previous page
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        // replace the current route with /checkout/contact-data route
        this.props.history.replace('/checkout/contact-data');
    };

    render() {        
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinue={this.checkoutContinueHandler} />
            </div>
        );
    }
}

export default Checkout;