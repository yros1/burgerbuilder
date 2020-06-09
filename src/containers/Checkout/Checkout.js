import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    
    state = {  
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        // extract QeryParameters
        // console.log(this.props.location);
        // URLSearchParams convets string '?bacon=2&cheese=2&meat=1&salad=2' 
        // to array [['bacon', '2'], ['cheese', '2'], ['meat', '1'], ['salad', '2']
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]; // by adding plus before param[1], we convert it to be a number
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price });
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
                    <Route path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;