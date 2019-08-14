import React from 'react';
import { withActions } from '7s/components';

import placeholder from './avatar-placeholder.png';
import './user-dropdown.scss';

const UserDropdown = ({user}) => {
    console.log(user);
    return (
        <div>
            <img
                className="user-dropdown__image"
                alt="Profile and settings menu"
                src={placeholder}
            />
        </div>
    );
};

export {UserDropdown};

export default withActions(UserDropdown, ['user']);
