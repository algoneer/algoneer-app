import React from 'react';
import PropTypes from 'prop-types';
import { T } from '7s/components';

import Chip from '../../common/chip/chip.jsx';


const StatusChip = ({ k, status }) => {
    if (status === 'passed') {
        return (
            <Chip color="lightgreen">
                <T k={`${k}.passed`} />
            </Chip>
        );
    }
    if (status === 'failed') {
        return (
            <Chip color="red">
                <T k={`${k}.failed`} />
            </Chip>
        );
    }
};

StatusChip.defaultProps = {
    k: 'generic.statuses',
};

StatusChip.propTypes = {
    k: PropTypes.string,
    status: PropTypes.oneOf(['passed', 'failed']),
};

export default StatusChip;
