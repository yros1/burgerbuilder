import React from 'react';

import classes from './Modal.css';

const modal = (props) => (
    <div className={classes.Modal}>
        {/* children can be anything: other component, some text, paragraph etc */}
        {props.children}
    </div>
);

export default modal;