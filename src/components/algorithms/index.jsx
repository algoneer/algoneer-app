import React, { Fragment, PureComponent } from 'react';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

import Empty from './empty.jsx';
import Table from './table/table.jsx';

class AlgorithmsPage extends PureComponent {
    render() {
        return (
            <Fragment>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/' },
                        { name: 'My algorithms', url: '/algorithms', selected: true },
                    ]}
                />
                {this.props.empty ? ( // TODO: This got added for debugging only
                    <Empty />
                ) : (
                    <Table />
                )}
            </Fragment>
        );
    }
}

export default AlgorithmsPage;
