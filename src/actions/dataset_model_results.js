import Base from '7s/actions/base';

export default class DatasetModelResult extends Base {
    static get defaultKey() {
        return 'datasetModelResults';
    }

    constructor(store, settings, key) {
        super(store, settings, key);
        this.initialize();
        const ResultsApi = settings.get(['apis', 'results']);
        this.api = new ResultsApi(settings, store);
    }

    initialize(){
        this.set({ status: 'initialized' });
    }

    getResults(datasetId, modelId) {
        const { status, updating } = this.get();
        if (status === 'loaded') {
            if (updating)
                return;
            this.update({ status: 'loaded', updating: true });
        }
        else
            this.set({ status: 'loading' });
        return this.handle(
            this.api.getDatasetModelResults(datasetId, modelId),
            (response) => {
                this.update({ data: response.data, status: 'loaded' });
            },
            (error) => {
                this.update({ status: 'failed', error: error });
            }
        );
    }
}
