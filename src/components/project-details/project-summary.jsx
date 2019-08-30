import React from 'react';
import PropTypes from 'prop-types';
import { A } from '7s/components';

import HoveringBox from '../common/hovering-box/hovering-box.jsx';

import settingsVector from './settings.svg';

import './project-summary.scss';


const ProjectSummary = ({ description, featureSwitchSettings, id, title }) => (
    <HoveringBox>
        <h1 className="project-summary__title">{ title }</h1>
        {featureSwitchSettings && (
            <A href={`/projects/${id}/settings`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <image height="100%" width="100%" xlinkHref={settingsVector} />
                </svg>
            </A>
        )}
        <div className="project-summary__description">
            { description }
        </div>
    </HoveringBox>
);

PropTypes.defaultProps = {
    featureSwitchSettings: false,
};

ProjectSummary.propTypes = {
    description: PropTypes.node,
    featureSwitchSettings: PropTypes.bool,
    id: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired,
};

export default ProjectSummary;
