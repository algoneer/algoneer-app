import Example from 'components/example';
import NewAlgorithmPage from 'components/new-algorithm';
import AlgorithmsPage from 'components/algorithms';
import AlgorithmDetailsPage from 'components/algorithm-details';

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
    [
        'algorithm-details',
        {
            url: '/algorithms/1',
            handler: () => ({ title: 'Algorithm Details', component: AlgorithmDetailsPage, props: { id: 1 } }),
        },
    ],
]);

export default routes;
