import React, { useState } from 'react';
import classnames from 'classnames';
import { A, withActions } from '7s/components';

import placeholder from './avatar-placeholder.png';
import './user-dropdown.scss';

let id = 0;
function uniqueId() {
    id++;
    return `id-${id}`;
}

const UserDropdown = ({user}) => {
    const [open, setOpen] = useState(true);
    const [toggleId] = useState(uniqueId());
    const [dropdownId] = useState(uniqueId());
    return (
        <div className="user-dropdown">
            <button
                id={toggleId}
                aria-haspopup={true}
                aria-owns={dropdownId}
                aria-controls={dropdownId}
                className="user-dropdown__toggle"
                onClick={() => setOpen(!open)}
            >
                <img
                    alt="Profile and settings menu"
                    className="user-dropdown__image"
                    src={placeholder}
                />
            </button>
            <div
                id={dropdownId}
                aria-expanded={open}
                aria-labelledby={toggleId}
                className={classnames(
                    'user-dropdown__dropdown',
                    { 'user-dropdown__dropdown--closed': open },
                )}
            >
                <span className="user-dropdown__dropdown-item user-dropdown__dropdown-item--last-of-category">
                    Logged in as {user.user.email}
                </span>
                <ul>
                    <li className="user-dropdown__dropdown-item">
                        <a
                            className="user-dropdown__dropdown-item-link"
                            href="https://docs.algoneer.org/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Documentation
                        </a>
                    </li>
                    <li className="user-dropdown__dropdown-item user-dropdown__dropdown-item--last-of-category">
                        <A className="user-dropdown__dropdown-item-link" href="/settings">Settings</A>
                    </li>
                    <li className="user-dropdown__dropdown-item">
                        <A className="user-dropdown__dropdown-item-link" href="/logout">Sign out</A>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export {UserDropdown};

export default withActions(UserDropdown, ['user']);
