import Base from '7s/actions/base';

export default class Datasets extends Base {
    static get defaultKey() {
        return 'datasets';
    }

    constructor(store, settings, key) {
        super(store, settings, key);
        this.initialize();
        const ProjectsApi = settings.get(['apis', 'projects']);
        this.api = new ProjectsApi(settings, store);
    }

    initialize(){
        this.set({ status: 'initialized' });
    }

    getDatasets(projectId) {
        const { status, updating } = this.get();
        if (status === 'loaded') {
            if (updating)
                return;
            this.update({ status: 'loaded', updating: true });
        }
        else
            this.set({ status: 'loading' });
        return this.handle(
            this.api.getDatasets(projectId),
            (response) => {
                this.update({ data: response.data, status: 'loaded' });
            },
            (error) => {
                this.update({ status: 'failed', error: error });
            }
        );
    }
}
