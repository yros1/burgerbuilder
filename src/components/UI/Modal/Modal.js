import React, { Component } from 'react';

import classes from './Modal.css';
// import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{

    shouldComponentUpdate (nextProps, nextState) {
        // This only updates if show property changes.
        // below longer version of check
        // if  (nextProps.show !== this.props.show){
        //     return true;
        // }

        // if old and next value of show property are different then
        // allow to render OrderSummary Component.
        return nextProps.show !== this.props.show
    }

    // This is only for checking if above condition works properly
    componentDidUpdate() {
        console.log('[Modal] DidUpdate');
    }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div onClick={this.props.clicked}
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity:  this.props.show ? '1' : '0'
                    }}>
                    {/* children can be anything: other component, some text, paragraph etc */}
                    {this.props.children}
                </div>
            </Aux>
        );
    }
} 

export default Modal;