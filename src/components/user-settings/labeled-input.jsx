import React from 'react';
import PropTypes from 'prop-types';

import './labeled-input.scss';

/**
 * An input field with a label that looks like a placeholder but retracts
 * to the top when an input is made.
 */
const LabelledInput = ({ label, ...props }) => (
    <span className="labeled-input">
        <div className="labeled-input__label">
            {label}
        </div>
        <input
            aria-label={label}
            {...props}
            className={`labeled-input__input ${props.className}`}
        />
    </span>
);

LabelledInput.propTypes = {
    className: '',
    label: '',
};

LabelledInput.propTypes = {
    /* Classnames to apply on the input */
    className: PropTypes.string,
    /* A describing label for the input */
    label: PropTypes.string,
};

export default LabelledInput;
