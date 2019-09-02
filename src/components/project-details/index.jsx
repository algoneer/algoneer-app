import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withActions } from '7s/components/store';
import { withRouter } from '7s/components/router';
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
        this.load(true);
    }

    load(initialize) {
        const {
            projectDetails,
            algorithms,
            datasets,
            models,
            datasetModelResults,
            projectDetailsActions,
            algorithmsActions,
            datasetsActions,
            modelsActions,
            datasetModelResultsActions,
            id } = this.props;
        if (initialize) {
            projectDetailsActions.initialize();
            algorithmsActions.initialize();
            datasetsActions.initialize();
            modelsActions.initialize();
            datasetModelResultsActions.initialize();
        }
        if (projectDetails.status === 'initialized')
            projectDetailsActions.getProjectDetails(id);
        if (algorithms.status === 'initialized')
            algorithmsActions.getAlgorithms(id);
        if (datasets.status === 'initialized')
            datasetsActions.getDatasets(id);
        if (algorithms.status === 'loaded' && models.status === 'initialized'){
            const algorithm = this.getAlgorithm();
            modelsActions.getModels(algorithm.id);
        }
        if (models.status === 'loaded' && datasets.status === 'loaded' && datasetModelResults.status === 'initialized'){
            const dataset = this.getDataset();
            const model = this.getModel();
            datasetModelResultsActions.getResults(dataset.id, model.id);
        }
    }

    getSHAPResult(){
        const {datasetModelResults} = this.props;
        for(const result of datasetModelResults.data){
            if (result.name === 'shap.model')
                return result;
        }
    }

    params(){
        return this.props.router.currentParams;
    }

    getAlgorithm(){
        const {algorithms} = this.props;
        const params = this.params();
        const algorithmId = params.get('algorithmId');
        if (algorithmId === undefined)
            return algorithms.data[0];
        return algorithms.data.find(algorithm => algorithm.id === algorithmId);
    }

    getModel(){
        const {models} = this.props;
        return models.data[0];
    }

    getDataset(){
        const {datasets} = this.props;
        return datasets.data[0];
    }

    componentDidUpdate(){
        this.load();
    }

    renderLoaded() {
        const {projectDetails, algorithms, models, datasets, router} = this.props;
        const shapResult = this.getSHAPResult();
        const shapData = shapResult.data.plot_data;

        const params = router.currentParams;

        const encode = params =>
            Object.keys(params).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
            }).join('&');

        const select = (algorithmId, modelId, datasetId) => {
            params.algorithmId=algorithmId;
            params.modelId=modelId;
            params.datasetId=datasetId;
            this.load(true);
            router.navigateToUrl(router.currentPath+'?'+encode(params));
        };
        return (
            <Fragment>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/' },
                        { name: 'My projects', url: '/projects' },
                        { name: projectDetails.data.name, url: `/projects/${this.props.id}`, selected: true },
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
                                <Selects algorithm={this.getAlgorithm()} dataset={this.getDataset()} model={this.getModel()}
                                    datasets={datasets.data} models={models.data} algorithms={algorithms.data} select={select}/>
                            </div>
                            <HoveringBox>
                                <h2>Test Result: <strong>SHAP Values</strong></h2>
                                <Graphs data={shapData}/>
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
        const { projectDetails, algorithms, datasets, models, datasetModelResults } = this.props;
        return <WithLoader
            resources={[projectDetails, algorithms, datasets, models, datasetModelResults]}
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

export default withActions(withRouter(ProjectDetailsPage), ['projectDetails', 'algorithms', 'datasets', 'models', 'datasetModelResults']);
