import React, { PureComponent } from 'react';
import { format } from 'date-fns';
import { A, T } from '7s/components';

import Chip from './table/chip.jsx';

import './algorithms-table.scss';


const dateFormat = 'MMM D, YYYY';

const elements = [
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
        status: 'failed',
        url: '/algorithms/2',
    },
];

const StatusChip = ({status}) => {
    if (status === 'passed') {
        return (
            <Chip color="lightgreen">
                <T k="algorithms.statuses.passed" />
            </Chip>
        );
    }
    if (status === 'failed') {
        return (
            <Chip color="red">
                <T k="algorithms.statuses.failed" />
            </Chip>
        );
    }
}

class AlgorithmsTable extends PureComponent {
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
                    {elements.map((element) => (
                        <tr key={element.id}>
                            <td>
                                <A href={element.url}>
                                    {element.id}
                                </A>
                            </td>
                            <td>
                                <A href={element.url}>
                                    {element.name}
                                </A>
                            </td>
                            <td>{format(new Date(element.dateCreated), dateFormat)}</td>
                            <td>
                                <StatusChip status={element.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default AlgorithmsTable;
