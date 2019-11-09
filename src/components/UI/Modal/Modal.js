import React from 'react';

import classes from './Modal.css';

const modal = (props) => (
    <div 
        className={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity:  props.show ? '1' : '0'
        }}>
        {/* children can be anything: other component, some text, paragraph etc */}
        {props.children}
    </div>
);

export default modal;