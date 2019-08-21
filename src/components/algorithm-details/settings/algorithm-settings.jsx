import React from 'react';
import PropTypes from 'prop-types';

import HoveringBox from '../hovering-box.jsx';

//import './algorithm-settings.scss';


const AlgorithmDetailsSettings = ({
    description,
    title,
    onDelete,
    onSave,
}) => (
    <HoveringBox>
        <form>
            <input value={title} />
            <input value={description} />
            <button
                type="submit"
                onClick={onSave}
            >
                Save
            </button>
        </form>
        <button
            onClick={onDelete}
        >
            Delete
        </button>
    </HoveringBox>
);

AlgorithmDetailsSettings.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default AlgorithmDetailsSettings;
