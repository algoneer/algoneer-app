import BaseApi from './base';

export default class AccessTokenApi extends BaseApi {

    constructor(settings) {
        super(...arguments);
        this.projects = settings.get(['apiFixtures', 'projects']) || [];

    }

    getProjects() {
        return new Promise((resolve) => {
            return setTimeout(() => {
                resolve({ scopes: this.projects });
            }, 700);
        });
    }
}
