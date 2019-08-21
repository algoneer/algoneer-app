import React from 'react';
import PropTypes from 'prop-types';
import { A } from '7s/components';

import './box-link.scss';


const BoxLink = ({children, href}) => (
    <A className="box-button" href={href}>
        {children}
    </A>
);

BoxLink.propTypes = {
    children: PropTypes.node,
    href: PropTypes.string.isRequired,
};

export default BoxLink;
