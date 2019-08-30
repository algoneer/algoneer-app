import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withActions } from '7s/components/store';
import WithLoader from '7s/components/with_loader';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

import Empty from './empty.jsx';
import AlgorithmsTable from './projects-table.jsx';

class AlgorithmsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadProjects();
    }

    loadProjects() {
        this.props.projectsActions.getProjects();
    }

    renderLoaded() {
        return (
            <Fragment>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/' },
                        { name: 'My projects', url: '/projects', selected: true },
                    ]}
                />
                {(this.props.projects.data || []).length === 0 ? (
                    <Empty />
                ) : (
                    <AlgorithmsTable projects={this.props.projects.data} />
                )}
            </Fragment>
        );
    }

    render() {
        return <WithLoader
            resources={[this.props.projects]}
            renderLoaded={() => this.renderLoaded()} />;
    }
}

AlgorithmsPage.propTypes = {
    projects: PropTypes.object.isRequired,
    projectsActions: PropTypes.object.isRequired,
};

export default withActions(AlgorithmsPage, ['projects']);
