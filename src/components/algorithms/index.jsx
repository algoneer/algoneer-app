import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

import Empty from './empty.jsx';
import AlgorithmsTable from './algorithms-table.jsx';

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
                    <AlgorithmsTable />
                )}
            </Fragment>
        );
    }
}

AlgorithmsPage.defaultProps = {
    empty: false,
};

AlgorithmsPage.propTypes = {
    empty: PropTypes.bool,
};

export default AlgorithmsPage;
