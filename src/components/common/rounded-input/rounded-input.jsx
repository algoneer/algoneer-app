import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './rounded-input.scss';

/**
 * An fancy looking input field with rounded corners.
 */
const RoundedInput = ({ className, ...props }) => (
    <input
        {...props}
        className={classnames('rounded-input', className)}
    />
);

RoundedInput.defaultProps = {
    className: undefined,
};

RoundedInput.propTypes = {
    /* Classnames to apply on the input */
    className: PropTypes.string,
};

export default RoundedInput;
