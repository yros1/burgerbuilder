import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

import axios from '../../../axios-orders';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //Send data to backend using http request
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'John Smith',
                address: {
                    street: '12 Hight Street',
                    city: 'London',
                    postCode: 'LL1 0LL',
                    country: 'United Kingdom'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'birds'
        }

        axios.post('/orders.json', order)
            .then(response => {        
                this.setState( { loading: false } );
                this.props.history.push('/')
            })
            .catch(error => {                
                this.setState( { loading: false } );
            });
    }

    render () {
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }
        
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}                
            </div>
        );
    }
}

export default ContactData;