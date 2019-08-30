import React, { PureComponent, Fragment } from 'react';
import { T } from '7s/components';
import SectionBox from '../common/section-box/section-box.jsx';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

class NewAlgorithmPage extends PureComponent {
    render() {
        return (
            <Fragment>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/' },
                        { name: 'Create project', url: '/projects/new', selected: true },
                    ]}
                />
                <main style={{ margin: '32px 0' }}>
                    <SectionBox>
                        <h1><T k="nav.create-project.title" /></h1>
                        <form>
                            <p>
                                <label>
                                    <T k="projects.terms.owner" />
                                    <select name="owner" disabled value="myself">
                                        <option value="myself">myself</option>
                                    </select>
                                </label>
                                <label>
                                    <T k="projects.terms.name" />
                                    <input name="name" type="text" required />
                                </label>
                            </p>
                            <p>
                                <label>
                                    <T k="projects.terms.type" />
                                    <input type="text" required />
                                </label>
                            </p>
                            <p>
                                <label>
                                    <T k="projects.terms.description" /> (optional)
                                    <textarea type="text" />
                                </label>
                            </p>
                            <p>
                                <button
                                    type="submit"
                                >
                                    Create
                                </button>
                            </p>
                        </form>
                    </SectionBox>
                </main>
            </Fragment>
        );
    }
}

export default NewAlgorithmPage;
