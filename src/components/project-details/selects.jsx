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
        const {select, algorithms, models, datasets, algorithm, model, dataset} = this.props;

        const algorithmValues = algorithms.map(algorithm => [algorithm.id, algorithm.name]);
        const modelValues = models.map(model => [model.id, model.hash.substr(0, 10)]);
        const datasetValues = datasets.map(dataset => [dataset.id, dataset.name]);

        return (
            <div className="project-details-selects">
                <HoveringSelect
                    values={algorithmValues}
                    currentValue={algorithm.id}
                    label="Algorithm"
                    onUpdateValue={(newAlgorithmId) => select(newAlgorithmId, model.id, dataset.id)}
                />
                <HoveringSelect
                    values={modelValues}
                    label="Model"
                    currentValue={model.id}
                    onUpdateValue={(newModelId) => select(algorithm.id, newModelId, dataset.id)}
                />
                <HoveringSelect
                    values={datasetValues}
                    label="Dataset"
                    currentValue={dataset.id}
                    onUpdateValue={(newDatasetId) => select(algorithm.id, model.id, newDatasetId)}
                />
            </div>
        );
    }
}

export default withActions(ProjectDetailsSelects, ['projectDetails']);
