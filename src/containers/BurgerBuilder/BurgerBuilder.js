import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // old fashioned way of defining state
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    } 

    componentDidMount () {
        console.log(this.props);
        axios.get('https://react-my-burger-b40eb.firebaseio.com/ingredients.json')
            .then( response => {
                // fetching ingredients from db.
                this.setState({ingredients: response.data});
                
                // Check if the OrderNow button must be enabled
                this.updatePurchaseState(response.data);
            } )
            .catch(error => {
                this.setState({error:true})
            });
    }

    updatePurchaseState (ingeredients) {
        //turn ingeredients object to array of values
        const sum = Object.keys(ingeredients)
            .map(igKey => {
                return ingeredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
             ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount ;

        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeInredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
             ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount ;

        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        // Send data to backend using http request
        // this.setState( { loading: true } );
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'John Smith',
        //         address: {
        //             street: '12 Hight Street',
        //             city: 'London',
        //             postCode: 'LL1 0LL',
        //             country: 'United Kingdom'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'birds'
        // }

        // axios.post('/orders.json', order)
        //     .then(response => {        
        //         this.setState( { loading: false, purchasing: false } );
        //     })
        //     .catch(error => {                
        //         this.setState( { loading: false, purchasing: false } );
        //     });

        // chenge a page to checkout and pass ingredients data to it.

        const queryParams = [];
        for (let i in this.state.ingredients) {
            // array of string of 'proprty_name = property_vale'
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&'); // join all array elements together with & character.
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString // example:  ?bacon=2&cheese=2&meat=1&salad=2
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients // I make a copy of that object
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // disabledInfo = {salad: true, meat: false, ...}

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        inredientRemoved={this.removeInredientHandler} 
                        disabled={disabledInfo} 
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued = {this.purchaseContinueHandler} />
        }

        if (this.state.loading) {
            // show spinner
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler} 
                    clicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);