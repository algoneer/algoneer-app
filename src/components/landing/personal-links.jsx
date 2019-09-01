import React, { Component, Fragment } from 'react';
import { withActions } from '7s/components/store';

import GroupLink from './group-link.jsx';


class PersonalItems extends Component {
    constructor(props, context) {
        super(props, context);
        this.loadProjects();
    }

    loadProjects() {
        this.props.projectsActions.getProjects();
    }

    render() {
        const myProjectsCount = this.props.projects.status === 'loaded' ? (
            this.props.projects.data.length
        ) : (
            undefined
        );
        return (
            <Fragment>
                <li>
                    <GroupLink
                        count={myProjectsCount}
                        href="/projects"
                        name="My projects" // <T k="nav.my-projects.title" />
                    />
                </li>
                {/* <li>
                    <GroupLink
                        count={7}
                        href="/projects"
                        name="Shared with me" // <T k="nav.shared-with-me.title" />
                    />
                </li> */}
            </Fragment>
        );
    }
}

export default withActions(PersonalItems, ['projects']);
