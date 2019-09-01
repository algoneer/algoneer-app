import Base from '7s/actions/base';

export default class Models extends Base {
    static get defaultKey() {
        return 'models';
    }

    constructor(store, settings, key) {
        super(store, settings, key);
        this.initialize();
        const AlgorithmsApi = settings.get(['apis', 'algorithms']);
        this.api = new AlgorithmsApi(settings, store);
    }

    initialize(){
        this.set({ status: 'initialized' });
    }

    getModels(algorithmId) {
        const { status, updating } = this.get();
        if (status === 'loaded') {
            if (updating)
                return;
            this.update({ status: 'loaded', updating: true });
        }
        else
            this.set({ status: 'loading' });
        return this.handle(
            this.api.getModels(algorithmId),
            (response) => {
                this.update({ data: response.data, status: 'loaded' });
            },
            (error) => {
                this.update({ status: 'failed', error: error });
            }
        );
    }
}
