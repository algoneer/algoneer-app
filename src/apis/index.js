import ProjectsApi from './projects';
import AlgorithmsApi from './algorithms';
import ResultsApi from './results';

export default new Map([
    ['projects', ProjectsApi],
    ['algorithms', AlgorithmsApi],
    ['results', ResultsApi],
]);
