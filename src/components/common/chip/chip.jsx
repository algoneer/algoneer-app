import React from 'react';
import PropTypes from 'prop-types';

import './chip.scss';


const Chip = ({ children, color }) => (
    <span
        className="chip"
        style={{background: color}}
    >
        { children }
    </span>
);

Chip.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string.isRequired,
};

export default Chip;
