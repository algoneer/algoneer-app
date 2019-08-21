import React, { Component, Fragment } from 'react';
import SectionBox from '../common/section-box/section-box.jsx';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

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
                <SectionBox>
                    <h1>User settings</h1>
                    <form>
                        <h2>Change information</h2>
                        <p>
                            <label>
                                Name
                                <input name="displayname" type="text" />
                            </label>
                        </p>
                        <p>
                            <label>
                                Username
                                <input name="name" type="text" />
                            </label>
                        </p>
                        <h2>Change password</h2>
                        <p>
                            <label>
                                New password
                                <input
                                    autoComplete="new-password"
                                    name="new-password"
                                    type="password"
                                />
                            </label>
                        </p>
                        <p>
                            <label>
                                Confirm new password
                                <input
                                    autoComplete="new-password"
                                    name="new-password-confirmation"
                                    type="password"
                                />
                            </label>
                        </p>
                    </form>
                </SectionBox>
            </Fragment>
        );
    }
}

export default UserSettingsPage;
