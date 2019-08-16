import React, { PureComponent } from 'react';
import { format } from 'date-fns';

const dateFormat = 'MMM D, YYYY';

const elements = [
    {
        path: '/hockey',
        name: 'Ice Hockey vs. Field Hockey',
        dateCreated: '2019-08-15T08:18:36Z',
        status: 'passed',
    }, {
        path: '/dom',
        name: 'Kölner Dom vs. Aachener Dom',
        dateCreated: '2019-08-13T08:18:36Z',
        status: 'passed',
    },
];

class Table extends PureComponent {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Path</th>
                        <th>Name</th>
                        <th>Date created</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {elements.map((element) => (
                        <tr key={element.path}>
                            <td>{element.path}</td>
                            <td>{element.name}</td>
                            <td>{format(new Date(element.dateCreated), dateFormat)}</td>
                            <td>{element.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Table;
