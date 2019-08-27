import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';
import HoveringBox from '../common/hovering-box/hovering-box.jsx';

import HoveringSelect from './hovering-select.jsx';
import ProjectSummary from './project-summary.jsx';

import './index.scss';


class ProjectDetailsPage extends PureComponent {
    renderTheCat(mouse) {
        return <li mouse={mouse} />;
    }

    render() {
        return (
            <Fragment>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/' },
                        { name: 'My projects', url: '/projects' },
                        { name: 'Current project', url: `/projects/${this.props.id}`, selected: true },
                    ]}
                />
                <div style={{ margin: '32px 0' }}>
                    <ProjectSummary
                        title="Test Test"
                        description="Description Description Description Description Description Description Description Description Description Description Description Description"
                    />
                </div>
                <div style={{ margin: '32px 0' }}>
                    <HoveringBox><HoveringSelect label="Model type" /></HoveringBox>
                    <HoveringBox><HoveringSelect label="Model version" /></HoveringBox>
                    <HoveringBox><HoveringSelect label="Dataset" /></HoveringBox>
                </div>
                <HoveringBox>
                    Some cool content
                </HoveringBox>
            </Fragment>
        );
    }
}

ProjectDetailsPage.propTypes = {
    id: PropTypes.string.isRequired,
};

export default ProjectDetailsPage;
