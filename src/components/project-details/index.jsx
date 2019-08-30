import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withActions } from '7s/components/store';
import WithLoader from '7s/components/with_loader';

import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';
import HoveringBox from '../common/hovering-box/hovering-box.jsx';

import ProjectSettings from './settings/project-settings.connect.jsx';
import ProjectSummary from './project-summary.jsx';
import Selects from './selects.jsx';
import Graphs from './graphs/graphs.jsx';

import './index.scss';


class ProjectDetailsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadProject();
    }

    loadProject() {
        this.props.projectDetailsActions.getProjectDetails(this.props.id);
    }

    renderLoaded() {
        return (
            <Fragment>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/' },
                        { name: 'My projects', url: '/projects' },
                        { name: 'Current project', url: `/projects/${this.props.id}`, selected: true },
                    ]}
                />
                <aside style={{ margin: '32px 0' }}>
                    <ProjectSummary
                        description={this.props.projectDetails.data.description}
                        id={this.props.id}
                        title={this.props.projectDetails.data.name}
                    />
                </aside>
                <main style={{ margin: '32px 0' }}>
                    {this.props.view === 'tests' ? (
                        <Fragment>
                            <div style={{ margin: '32px 0' }}>
                                <Selects />
                            </div>
                            <HoveringBox>
                                <Graphs />
                            </HoveringBox>
                        </Fragment>
                    ) : (
                        <ProjectSettings id={this.props.id} />
                    )}
                </main>
            </Fragment>
        );
    }

    render() {
        return <WithLoader
            resources={[this.props.projectDetails]}
            renderLoaded={() => this.renderLoaded()} />;
    }
}

ProjectDetailsPage.defaultProps = {
    view: 'tests',
};

ProjectDetailsPage.propTypes = {
    id: PropTypes.string.isRequired,
    projectDetails: PropTypes.object.isRequired,
    projectDetailsActions: PropTypes.object.isRequired,
    view: PropTypes.oneOf(['tests', 'settings']),
};

export default withActions(ProjectDetailsPage, ['projectDetails']);
