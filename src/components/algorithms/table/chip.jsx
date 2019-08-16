import React from 'react';

import './chip.scss';


const Chip = ({ children, color }) => (
    <span
        className="chip"
        style={{background: color}}
    >
        { children }
    </span>
);

export default Chip;
