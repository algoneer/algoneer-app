import Example from 'components/example';
import NewAlgorithmPage from 'components/new-algorithm';
import AlgorithmsPage from 'components/algorithms';

const routes = new Map([
    [
        'root',
        {
            url: '/',
            handler : () => ({title: '', component: Example}),
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
]);

export default routes;
