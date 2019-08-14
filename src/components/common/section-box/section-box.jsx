import React from 'react';
import PropTypes from 'prop-types';

const SectionBox = ({ children, primary }) => (
    <div
        style={{
            background: primary ? '#E3F6FF' : '#FBFBFB',
            borderRadius: '10px',
            padding: '24px',
        }}
    >
        {children}
    </div>
);

SectionBox.defaultProps = {
    primary: false,
};

SectionBox.propTypes = {
    children: PropTypes.node,
    primary: PropTypes.bool,
};

export default SectionBox;
