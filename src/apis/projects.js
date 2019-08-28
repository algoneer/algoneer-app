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
}
