import React from 'react';
import PropTypes from 'prop-types';

import './hovering-box.scss';


const HoveringBox = ({ children }) => (
    <div className="hovering-box">
        { children }
    </div>
);

HoveringBox.propTypes = {
    children: PropTypes.node,
};

export default HoveringBox;
