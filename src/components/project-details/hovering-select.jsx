import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './hovering-select.scss';


class HoveringSelect extends PureComponent {
    render() {
        const { label, onUpdateValue, ...props } = this.props;
        return (
            <span className="labeled-input">
                <div className="labeled-input__label">
                    {label}
                </div>
                <select
                    className="hovering-select"
                    onChange={event => onUpdateValue(event.target.value)}
                    {...props}
                >
                    <option>Test</option>
                    <option>Test 2</option>
                    <option>Test 3</option>
                </select>
            </span>
        );
    }
}

HoveringSelect.propTypes = {
    label: PropTypes.string.isRequired,
    onChangeValue: PropTypes.func,
};

export default HoveringSelect;
