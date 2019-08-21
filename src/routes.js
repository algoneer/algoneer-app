import LandingPage from 'components/landing';
import NewAlgorithmPage from 'components/new-algorithm';
import AlgorithmsPage from 'components/algorithms';
import AlgorithmDetailsPage from 'components/algorithm-details';
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
        'algorithms',
        {
            url: '/algorithms',
            handler: () => ({ title: 'Algorithms', component: AlgorithmsPage }),
        },
    ],
    // TODO: Next route got added for debugging only
    [
        'algorithms-empty',
        {
            url: '/algorithms/empty',
            handler: () => ({ title: 'Algorithms', component: AlgorithmsPage, props: {empty: true }}),
        },
    ],
    [
        'new-algorithm',
        {
            url: '/algorithms/new',
            handler: () => ({ title: 'New algorithm', component: NewAlgorithmPage }),
        },
    ],
    [
        'algorithm-details',
        {
            url: '/algorithms/([0-9]+)',
            handler: (id) => ({
                title: 'Algorithm Details',
                component: AlgorithmDetailsPage,
                props: {
                    // FIXME: catch errors
                    id: Number.parseInt(id),
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
