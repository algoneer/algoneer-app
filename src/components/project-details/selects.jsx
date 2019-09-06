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
        const {select, algorithms, models, algorithm, model} = this.props;

        const algorithmValues = algorithms.map(algorithm => [algorithm.id, algorithm.name]);
        const modelValues = models.map(model => [model.id, model.hash.substr(0, 10)]);

        return (
            <div className="project-details-selects">
                <HoveringSelect
                    values={algorithmValues}
                    currentValue={algorithm.id}
                    label="Algorithm"
                    onUpdateValue={(newAlgorithmId) => select(newAlgorithmId, model.id)}
                />
                <HoveringSelect
                    values={modelValues}
                    label="Model"
                    currentValue={model.id}
                    onUpdateValue={(newModelId) => select(algorithm.id, newModelId)}
                />
            </div>
        );
    }
}

export default withActions(ProjectDetailsSelects, ['projectDetails']);
