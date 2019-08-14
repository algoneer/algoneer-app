import React, { Fragment, PureComponent } from 'react';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

import Empty from './empty.jsx';

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
                <Empty />
            </Fragment>
        );
    }
}

export default AlgorithmsPage;
