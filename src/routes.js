import Example from 'components/example';

const routes = new Map([
    [
        'example',
        {
            url: '/example',
            handler : () => ({title: 'example', component: Example}),
        },
    ],
]);

export default routes;
