import React from 'react';
import PropTypes from 'prop-types';
import { A } from '7s/components';

import HoveringBox from '../../common/hovering-box/hovering-box.jsx';
import LabeledInput from '../../common/labeled-input/labeled-input.jsx';

//import './project-settings.scss';


const AlgorithmDetailsSettings = ({
    description,
    id,
    title,
    onDelete,
    onSave,
    onUpdateDescription,
    onUpdateTitle,
}) => (
    <HoveringBox>
        <form>
            <LabeledInput
                label="Project title"
                value={title}
                onChange={onUpdateTitle}
            />
            <LabeledInput
                label="Project description"
                value={description}
                onChange={onUpdateDescription}
            />
            <button
                type="submit"
                onClick={onSave}
            >
                Save
            </button>
        </form>
        <A href={`/projects/${id}`}>
            Back to the tests
        </A>
        <button
            onClick={onDelete}
        >
            Delete
        </button>
    </HoveringBox>
);

AlgorithmDetailsSettings.propTypes = {
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onUpdateDescription: PropTypes.func.isRequired,
    onUpdateTitle: PropTypes.func.isRequired,
};

export default AlgorithmDetailsSettings;
