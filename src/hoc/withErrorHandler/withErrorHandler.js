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
                console.log(error);
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            // Clear any error setup once you cleack on Backdrop behind the Modal Component.
            this.setState({error: null});
        }

        render () {
            let errorMessage = null;

            if (this.state.error){
                errorMessage = <div>
                                    <ul>
                                        <li>{this.state.error.message}</li>
                                        <li>{this.state.error.data}</li>
                                    </ul>
                                </div> 
            }

            return (
                <Aux>
                    <Modal 
                        show={this.state.error}                        
                        modalClosed={this.errorConfirmedHandler}>
                            {/* <div>
                                <ul>
                                    <li><a href="#">Zurich</a></li>
                                    <li><a href="#">Geneva</a></li>
                                    <li><a href="#">Winterthur</a></li>
                                    <li><a href="#">Lausanne</a></li>
                                    <li><a href="#">Lucerne</a></li>
                                </ul>
                                
                            </div>                         */}
                            {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>            
            );
        }
    }
}

export default withErrorHandler;