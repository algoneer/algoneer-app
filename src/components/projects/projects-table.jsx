import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { A } from '7s/components';

import './projects-table.scss';


const dateFormat = 'MMM d, yyyy';

class ProjectsTable extends PureComponent {
    render() {
        console.dir(this.props);
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created by</th>
                        <th>Date created</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.projects.map((project) => (
                        <tr key={project.id}>
                            <td>
                                <A href={`/projects/${project.id}`}>
                                    {project.name}
                                </A>
                            </td>
                            <td>You</td>
                            <td>
                                <time dateTime={format(new Date(project['created_at']), 'yyyy-MM-dd')}>
                                    {format(new Date(project['created_at']), dateFormat)}
                                </time>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

ProjectsTable.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
};

export default ProjectsTable;
