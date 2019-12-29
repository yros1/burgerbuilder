import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null
        }

        componentDidMount () {
            axios.interceptors.request.use(request => {
                // if any send a service call request I dont have my error handling setup any more
                // therefore clear any error
                this.setState({error: null});
                return request;
            });
            axios.interceptors.response.use(response => response, error => {
                // fetch error from firebase from service call
                console.log("Tutaj error: " + error);
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            // Clear any error setup once you cleack on Backdrop behind the Modal Component.
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}                        
                        modalClosed={this.errorConfirmedHandler}>

                            {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>            
            );
        }
    }
}

export default withErrorHandler;