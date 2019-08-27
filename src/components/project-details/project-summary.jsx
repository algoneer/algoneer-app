import React from 'react';
import PropTypes from 'prop-types';

import HoveringBox from '../common/hovering-box/hovering-box.jsx';

import './project-summary.scss';


const ProjectSummary = ({ description, title }) => (
    <HoveringBox>
        <h1 className="project-summary__title">{ title }</h1>
        <span>passed</span>
        <div className="project-summary__description">
            { description }
        </div>
    </HoveringBox>
);

ProjectSummary.propTypes = {
    description: PropTypes.node,
    title: PropTypes.node.isRequired,
};

export default ProjectSummary;
