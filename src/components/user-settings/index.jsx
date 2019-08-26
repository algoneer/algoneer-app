import React, { Component, Fragment } from 'react';
import HoveringBox from '../common/hovering-box/hovering-box.jsx';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

import LabeledInput from './labeled-input.jsx';

import './index.scss';


class UserSettingsPage extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/' },
                        { name: 'User settings', url: '/settings', selected: true },
                    ]}
                />
                <HoveringBox>
                    <main>
                        <h1 className="user-settings__page-heading">User settings</h1>
                        <form>
                            <h2 className="user-settings__section-heading">Change information</h2>
                            <div className="user-settings__input">
                                <LabeledInput
                                    autoComplete="username"
                                    label="Username"
                                    name="name"
                                    type="text"
                                />
                            </div>
                            <div className="user-settings__input">
                                <LabeledInput
                                    autoComplete="name"
                                    label="Real name"
                                    name="displayname"
                                    type="text"
                                />
                            </div>
                            <h2 className="user-settings__section-heading">Change password</h2>
                            <div className="user-settings__input">
                                <LabeledInput
                                    label="Current password"
                                    autoComplete="current-password"
                                    name="current-password"
                                    type="password"
                                />
                            </div>
                            <div className="user-settings__input">
                                <LabeledInput
                                    label="New password"
                                    autoComplete="new-password"
                                    name="new-password"
                                    type="password"
                                />
                            </div>
                            <div className="user-settings__input">
                                <LabeledInput
                                    label="Confirm new password"
                                    autoComplete="new-password"
                                    name="new-password-confirmation"
                                    type="password"
                                />
                            </div>
                            <button
                                type="submit"
                            >
                                Save
                            </button>
                        </form>
                    </main>
                </HoveringBox>
            </Fragment>
        );
    }
}

export default UserSettingsPage;
