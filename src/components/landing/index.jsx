import React, { Component } from 'react';
import { T } from '7s/components';
import Box from '../common/section-box/section-box.jsx';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

import GroupLink from './group-link.jsx';

import './index.scss';


class LandingPage extends Component {
    render() {
        return (
            <div>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/', selected: true },
                    ]}
                />
                <div className="landing-page__section">
                    <Box primary>
                        <h2 className="landing-page__section-heading"><T k="nav.personal.title" /></h2>
                        <ul className="landing-page__group-list">
                            <li>
                                <GroupLink
                                    count={0}
                                    href="/projects"
                                    name="My projects" // <T k="nav.my-projects.title" />
                                />
                            </li>
                            {/* <li>
                                <GroupLink
                                    count={7}
                                    href="/projects"
                                    name="Shared with me" // <T k="nav.shared-with-me.title" />
                                />
                            </li> */}
                        </ul>
                    </Box>
                </div>

                {/* <div className="landing-page__section">
                    <Box>
                        <h2 className="landing-page__section-heading"><T k="nav.organizational.title" /></h2>
                        <ul className="landing-page__group-list">
                            <li>
                                <GroupLink
                                    count={72}
                                    href="/projects/group-1"
                                    name="Team 1"
                                />
                            </li>
                            <li>
                                <GroupLink
                                    count={2147483647}
                                    href="/projects/group-2"
                                    name="Team 👻 tests the system by putting in a long name"
                                />
                            </li>
                        </ul>
                    </Box>
                </div> */}
            </div>
        );
    }
}

export default LandingPage;
