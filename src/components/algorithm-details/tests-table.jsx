import React, { PureComponent } from 'react';
import { format } from 'date-fns';

import Chip from '../algorithms/table/chip.jsx';

import './tests-table.scss';


const dateFormat = 'MMM D, YYYY';

const tests = [
    {
        id: 1,
        name: 'Ice Hockey vs. Field Hockey',
        dateCreated: '2019-08-15T08:18:36Z',
        status: 'passed',
        url: '/algorithms/1',
    }, {
        id: 2,
        name: 'Kölner Dom vs. Aachener Dom',
        dateCreated: '2019-08-13T08:18:36Z',
        status: 'passed',
        url: '/algorithms/2',
    },
];

class TestsTable extends PureComponent {
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Date created</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map((test) => (
                        <tr key={test.id}>
                            <td>
                                <a href={test.url}>
                                    {test.id}
                                </a>
                            </td>
                            <td>
                                <a href={test.url}>
                                    {test.name}
                                </a>
                            </td>
                            <td>{format(new Date(test.dateCreated), dateFormat)}</td>
                            <td>
                                <Chip color="lightgreen">
                                    {test.status}
                                </Chip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default TestsTable;
