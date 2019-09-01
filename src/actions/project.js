import Base from '7s/actions/base';

export class ProjectDetails extends Base {
    static get defaultKey() {
        return 'projectDetails';
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

    getProjectDetails(id) {
        const { status, updating } = this.get();
        if (status === 'loaded' && id === this.store.state.projectDetails.data.id) {
            if (updating)
                return;
            this.update({ status: 'loaded', updating: true });
        }
        else
            this.set({ status: 'loading' });
        return this.handle(
            this.api.getProject(id),
            (response) => {
                this.update({ data: response, status: 'loaded' });
            },
            (error) => {
                this.update({ status: 'failed', error: error });
            }
        );
    }
}


export class DeleteProject extends Base {
    constructor(store, settings, key) {
        super(store, settings, key);
        const ProjectApi = settings.get(['apis', 'project']);
        this.api = new ProjectApi(settings, store);
        this.set({ status: 'initialized' });
    }

    static get defaultKey() {
        return 'deleteInvitation';
    }

    deleteProject(invitationId) {
        this.update({ status: 'deleting' });
        return this.handle(
            this.api.deleteProject(invitationId),
            () => {
                this.set({ status: 'success' });
            },
            (error) => {
                this.update({ status: 'failed', error: error });
            }
        );
    }

}
