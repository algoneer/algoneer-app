import React from 'react';
import PropTypes from 'prop-types';

import BoxLink from './box-link.jsx';

import './group-link.scss';


const GroupLink = ({ count, href, name }) => (
    <BoxLink href={href}>
        <div className="group-link__name">{name}</div>
        {count === undefined ? (
            <span className="group-link__count">…</span>
        ) : (
            <span
                aria-label={`contains ${count} ${count === 1 ? 'project' : 'projects'}`}
                className="group-link__count"
            >
                {count}
            </span>
        )}
    </BoxLink>
);

GroupLink.propTypes = {
    count: PropTypes.number,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default GroupLink;
