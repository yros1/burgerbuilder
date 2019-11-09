import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div onClick={props.clicked}
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity:  props.show ? '1' : '0'
            }}>
            {/* children can be anything: other component, some text, paragraph etc */}
            {props.children}
        </div>
    </Aux>
);

export default modal;