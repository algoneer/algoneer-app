import React from 'react';
import PropTypes from 'prop-types';

import RoundedInput from '../rounded-input/rounded-input.jsx';

import './labeled-input.scss';

/**
 * An input field with a label that looks like a placeholder but retracts
 * to the top when an input is made.
 */
const LabeledInput = ({ label, ...props }) => (
    <span className="labeled-input">
        <div className="labeled-input__label">
            {label}
        </div>
        <RoundedInput
            aria-label={label}
            {...props}
        />
    </span>
);

LabeledInput.propTypes = {
    /* A describing label for the input */
    label: PropTypes.string.isRequired,
};

export default LabeledInput;
