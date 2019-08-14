import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './breadcrumbs.scss';


const Breadcrumbs = ({ links }) => (
    <nav
        className="breadcrumbs"
    >
        {links.map((link) => (
            <a
                className={classnames(
                    'breadcrumbs__link',
                    { 'breadcrumbs__link--selected': link.selected },
                )}
                key={link.name}
                href={link.url}
            >
                {link.name}
            </a>
        ))}
    </nav>
);

Breadcrumbs.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        url: PropTypes.string.isRequired,
    })).isRequired,
};

export default Breadcrumbs;
