import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

import Table from '../algorithms/table/table.jsx';

import AlgorithmSummary from './algorithm-summary.jsx';

class AlgorithmDetailsPage extends PureComponent {
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
                <Table />
            </Fragment>
        );
    }
}

AlgorithmDetailsPage.propTypes = {
    id: PropTypes.number,
};

export default AlgorithmDetailsPage;
