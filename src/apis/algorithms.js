import BaseApi from './base';

export default class AlgorithmsApi extends BaseApi {

    getModels(id) {
        return this.authenticatedRequest({
            url: `algorithms/${id}/models`,
            method: 'GET',
        });
    }
}
