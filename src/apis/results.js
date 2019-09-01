import BaseApi from './base';

export default class ResultsApi extends BaseApi {

    getDatasetModelResults(datasetId, modelId) {
        return this.authenticatedRequest({
            url: `datasets/${datasetId}/models/${modelId}/results`,
            method: 'GET',
        });
    }
}
