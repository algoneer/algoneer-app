import React from 'react';
import PropTypes from 'prop-types';

import HoveringBox from '../../common/hovering-box/hovering-box.jsx';

//import './algorithm-settings.scss';


const AlgorithmDetailsSettings = ({
    description,
    title,
    onDelete,
    onSave,
    onUpdateDescription,
    onUpdateTitle,
}) => (
    <HoveringBox>
        <form>
            <input value={title} onChange={onUpdateTitle} />
            <input value={description} onChange={onUpdateDescription} />
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
    onUpdateDescription: PropTypes.func.isRequired,
    onUpdateTitle: PropTypes.func.isRequired,
};

export default AlgorithmDetailsSettings;
