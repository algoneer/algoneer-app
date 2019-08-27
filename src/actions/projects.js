import Base from '7s/actions/base';

export default class Projects extends Base {
    static get defaultKey() {
        return 'projects';
    }

    constructor(store, settings, key) {
        super(store, settings, key);
        this.set({ status: 'initialized' });
        const ProjectsApi = settings.get(['apis', 'projects']);
        this.api = new ProjectsApi(settings, store);
    }

    getProjects() {
        const { status, updating } = this.get();
        if (status === 'loaded') {
            if (updating)
                return;
            this.update({ status: 'loaded', updating: true });
        }
        else
            this.set({ status: 'loading' });
        return this.handle(
            this.api.getProjects(),
            (data) => {
                this.update({ data: data.data, status: 'loaded' });
            },
            (error) => {
                this.update({ status: 'failed', error: error });
            }
        );
    }
}
