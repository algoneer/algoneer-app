import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

import AlgorithmSummary from './algorithm-summary.jsx';
import AlgorithmSettings from './settings/algorithm-settings.connect.jsx';
import TestsTable from './tests-table.jsx';

import './index.scss';


class AlgorithmDetailsPage extends PureComponent {
    renderTheCat(mouse) {
        return <li mouse={mouse} />;
    }

    render() {
        return (
            <Fragment>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/' },
                        { name: 'My algorithms', url: '/algorithms' },
                        { name: 'Current algorithm', url: `/algorithms/${this.props.id}`, selected: true },
                    ]}
                />
                <div style={{ margin: '32px 0' }}>
                    <AlgorithmSummary
                        title="Test Test"
                        description="Description Description Description Description Description Description Description Description Description Description Description Description"
                    />
                </div>
                <Tabs className="algorithms-details-page__tabs">
                    <TabList>
                        <Tab>Results</Tab>
                        <Tab>Settings</Tab>
                        <Tab disabled>Access</Tab>
                    </TabList>
                    <TabPanel>
                        <TestsTable />
                    </TabPanel>
                    <TabPanel>
                        Construction site! Users are required to wear a helmet. 👷‍♀️
                        <AlgorithmSettings />
                    </TabPanel>
                    <TabPanel>
                        Construction site! Users are required to wear a helmet. 👷‍♀️
                    </TabPanel>
                </Tabs>
            </Fragment>
        );
    }
}

AlgorithmDetailsPage.propTypes = {
    id: PropTypes.number,
};

export default AlgorithmDetailsPage;
