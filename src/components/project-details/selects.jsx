import React from 'react';
//import PropTypes from 'prop-types';
import { withActions } from '7s/components/store';

import HoveringSelect from './hovering-select.jsx';
import './selects.scss';


class ProjectDetailsSelects extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadProject();
    }

    loadProject() {
        //this.props.projectDetailsActions.getProjectDetails(this.props.id);
    }

    render() {
        return (
            <div className="project-details-selects">
                <HoveringSelect
                    label="Algorithm type"
                    onUpdateValue={(x) => alert(x)}
                />
                <HoveringSelect
                    label="Algorithm version"
                    onUpdateValue={(x) => alert(x)}
                />
                <HoveringSelect
                    label="Dataset"
                    onUpdateValue={(x) => alert(x)}
                />
            </div>
        );
    }
}

export default withActions(ProjectDetailsSelects, ['projectDetails']);
