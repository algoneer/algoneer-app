import React, { Component } from 'react';
import { T } from '7s/components';
import Box from '../common/section-box/section-box.jsx';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

//import GroupLink from './group-link.jsx';
import PersonalLinks from './personal-links.jsx';

import './index.scss';


class LandingPage extends Component {
    static get blocksBackground() {
        return true;
    }

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
                            <PersonalLinks />
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
