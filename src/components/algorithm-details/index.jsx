import React, { Fragment, PureComponent } from 'react';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

import Table from '../algorithms/table/table.jsx';

class AlgorithmDetailsPage extends PureComponent {
    render() {
        return (
            <Fragment>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/' },
                        { name: 'My algorithms', url: '/algorithms' },
                        { name: 'Current algorithm', url: '/algorithms/1', selected: true },
                    ]}
                />
                <Table />
            </Fragment>
        );
    }
}

export default AlgorithmDetailsPage;
