import React from 'react';
import PropTypes from 'prop-types';

import bellVector from './bell.svg';
import './notification-bell.scss';

/**
 * A visual component for the notification bell in the navigation header.
 */
const NotificationBell = ({ notificationCount }) => {
    return (
        <div
            aria-label={(notificationCount === 1) ? '1 notification' : `${notificationCount} notifications`}
            className="notification-bell"
        >
            {(notificationCount > 0) && (
                <span
                    className= "notification-bell__count"
                >
                    {notificationCount}
                </span>
            )}
            <svg
                className="notification-bell__image"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <image height="100%" width="100%" xlinkHref={bellVector} />
            </svg>
        </div>
    );
};

NotificationBell.propTypes = {
    /** The component shows the amount of unread notifications, if higher than zero */
    notificationCount: PropTypes.number.isRequired,
};

export default NotificationBell;
