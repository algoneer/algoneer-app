import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


class HoveringSelect extends PureComponent {
    render() {
        return (
            <span>
                <label>{this.props.label}</label>
                Trust me. Im a select input!
            </span>
        );
    }
}

HoveringSelect.propTypes = {
    label: PropTypes.string.isRequired,
};

export default HoveringSelect;
