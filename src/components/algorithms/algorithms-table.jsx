import React, { PureComponent } from 'react';
import { format } from 'date-fns';

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
        status: 'passed',
        url: '/algorithms/2',
    },
];

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
                                <a href={element.url}>
                                    {element.id}
                                </a>
                            </td>
                            <td>
                                <a href={element.url}>
                                    {element.name}
                                </a>
                            </td>
                            <td>{format(new Date(element.dateCreated), dateFormat)}</td>
                            <td>
                                <Chip color="lightgreen">
                                    {element.status}
                                </Chip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default AlgorithmsTable;
