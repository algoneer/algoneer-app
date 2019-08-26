import React, { PureComponent } from 'react';
import { format } from 'date-fns';
import { A } from '7s/components';

import StatusChip from '../common/status-chip/status-chip.jsx';

import './tests-table.scss';


const dateFormat = 'MMM d, yyyy';

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
                                <A href={test.url}>
                                    {test.id}
                                </A>
                            </td>
                            <td>
                                <A href={test.url}>
                                    {test.name}
                                </A>
                            </td>
                            <td>{format(new Date(test.dateCreated), dateFormat)}</td>
                            <td>
                                <StatusChip status={test.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default TestsTable;
