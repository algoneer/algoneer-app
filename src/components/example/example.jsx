import React, { PureComponent } from 'react';
import { T } from '7s/components';
import Box from '../common/section-box/section-box.jsx';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

import GroupLink from './group-link.jsx';

import './example.scss';


class DashboardPage extends PureComponent {
    render() {
        return (
            <div>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/', selected: true },
                    ]}
                />
                <div className="dashboard-page__section">
                    <Box primary>
                        <h2 className="dashboard-page__section-heading"><T k="nav.personal.title" /></h2>
                        <ul className="dashboard-page__group-list">
                            <li>
                                <GroupLink
                                    count={0}
                                    href="/algorithms"
                                    name="My algorithms" // <T k="nav.my-algorithms.title" />
                                />
                            </li>
                            <li>
                                <GroupLink
                                    count={7}
                                    href="/algorithms"
                                    name="Shared with me" // <T k="nav.shared-with-me.title" />
                                />
                            </li>
                        </ul>
                    </Box>
                </div>

                <div className="dashboard-page__section">
                    <Box>
                        <h2 className="dashboard-page__section-heading"><T k="nav.organizational.title" /></h2>
                        <ul className="dashboard-page__group-list">
                            <li>
                                <GroupLink
                                    count={72}
                                    href="/algorithms/group-1"
                                    name="Team 1"
                                />
                            </li>
                            <li>
                                <GroupLink
                                    count={2147483647}
                                    href="/algorithms/group-2"
                                    name="Team 👻 tests the system by putting in a long name"
                                />
                            </li>
                        </ul>
                    </Box>
                </div>
            </div>
        );
    }
}

export default DashboardPage;
