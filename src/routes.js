import LandingPage from 'components/landing';
import NewProjectPage from 'components/new-project';
import ProjectsPage from 'components/projects';
import ProjectDetailsPage from 'components/project-details';
import UserSettingsPage from 'components/user-settings';

const routes = new Map([
    [
        'root',
        {
            url: '/',
            handler : () => ({title: '', component: LandingPage}),
        },
    ],
    [
        'projects',
        {
            url: '/projects',
            handler: () => ({ title: 'Projects', component: ProjectsPage }),
        },
    ],
    [
        'new-project',
        {
            url: '/projects/new',
            handler: () => ({ title: 'New project', component: NewProjectPage }),
        },
    ],
    [
        'project-details',
        {
            url: '/projects/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
            handler: (id) => ({
                title: 'Project Details',
                component: ProjectDetailsPage,
                props: {
                    id,
                },
            }),
        },
    ],
    [
        'settings',
        {
            url: '/settings',
            handler: () => ({ title: 'User Settings', component: UserSettingsPage }),
        },
    ],
]);

export default routes;
