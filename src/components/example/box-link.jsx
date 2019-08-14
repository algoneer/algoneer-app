import React from 'react';
import PropTypes from 'prop-types';

import './box-link.scss';


const BoxLink = ({children, href}) => (
    <a className="box-button" href={href}>
        {children}
    </a>
);

BoxLink.propTypes = {
    children: PropTypes.node,
    href: PropTypes.string.isRequired,
};

export default BoxLink;
