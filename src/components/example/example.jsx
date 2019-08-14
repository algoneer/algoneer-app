import React, { PureComponent } from 'react';
import Box from '../common/section-box/section-box.jsx';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

class DashboardPage extends PureComponent {
    render() {
        return (
            <div>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/', selected: true },
                    ]}
                />
                <Box primary>
                    <h2>Personal</h2>
                    <a href="/algorithms">
                        My algorithms
                    </a>
                    <a href="/algorithms">
                        Shared with me
                    </a>
                </Box>

                <Box>
                    <h2>Organizations</h2>
                    <a href="/algorithms">
                        Team 1
                    </a>
                    <a href="/algorithms">
                        Team 2
                    </a>
                </Box>
            </div>
        );
    }
}

export default DashboardPage;
