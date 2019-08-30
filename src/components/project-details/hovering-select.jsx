import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


class HoveringSelect extends PureComponent {
    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                A select input!
            </div>
        );
    }
}

HoveringSelect.propTypes = {
    label: PropTypes.string.isRequired,
};

export default HoveringSelect;
