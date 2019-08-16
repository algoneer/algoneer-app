import React from 'react';
import PropTypes from 'prop-types';

import HoveringBox from './hovering-box.jsx';

import './algorithm-summary.scss';


const AlgorithmSummary = ({ description, title }) => (
    <HoveringBox>
        <h1 className="algorithm-summary__title">{ title }</h1>
        <span>passed</span>
        <div className="algorithm-summary__description">
            { description }
        </div>
    </HoveringBox>
);

AlgorithmSummary.propTypes = {
    description: PropTypes.node,
    title: PropTypes.node.isRequired,
};

export default AlgorithmSummary;
