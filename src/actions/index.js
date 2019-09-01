import {
    DeleteProject,
    ProjectDetails,
} from './project';
import Projects from './projects';
import Algorithms from './algorithms';
import Models from './models';
import Datasets from './datasets';
import DatasetModelResults from './dataset_model_results';

export default new Map([
    ['projectDetails', ProjectDetails],
    ['deleteProject', DeleteProject],
    ['projects', Projects],
    ['datasets', Datasets],
    ['algorithms', Algorithms],
    ['datasetModelResults', DatasetModelResults],
    ['models', Models],
]);
