import BaseApi from './base';

export default class ProjectsApi extends BaseApi {

    getProjects() {
        return this.authenticatedRequest({
            url: 'projects',
            method: 'GET',
        });
    }

    getProject(id) {
        return this.authenticatedRequest({
            url: `projects/${id}`,
            method: 'GET',
        });
    }

    getDatasets(id){
        return this.authenticatedRequest({
            url: `projects/${id}/datasets`,
            method: 'GET',
        });
    }

    getAlgorithms(id){
        return this.authenticatedRequest({
            url: `projects/${id}/algorithms`,
            method: 'GET',
        });
    }

}
