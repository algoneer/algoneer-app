import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './hovering-select.scss';


class HoveringSelect extends PureComponent {
    render() {
        const { label, onUpdateValue, currentValue, values,  ...props } = this.props;
        const options = values.map(value => <option selected={currentValue===value[0]} key={value[0]} value={value[0]}>{value[1]}</option>);
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
                    {options}
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
