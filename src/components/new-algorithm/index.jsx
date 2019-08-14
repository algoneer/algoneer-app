import React, { PureComponent, Fragment } from 'react';
import { T } from '7s/components';
import Box from '../common/section-box/section-box.jsx';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs.jsx';

class NewAlgorithmPage extends PureComponent {
    render() {
        return (
            <Fragment>
                <Breadcrumbs
                    links={[
                        { name: 'Algoneer', url: '/' },
                        { name: 'Create algorithm', url: '/algorithms/new', selected: true },
                    ]}
                />
                <Box>
                    <h1><T k="nav.create-algorithm.title" /></h1>
                    <form>
                        <p>
                            <label>
                                <T k="algorithms.terms.owner" />
                                <select name="owner" disabled value="myself">
                                    <option value="myself">myself</option>
                                </select>
                            </label>
                            <label>
                                <T k="algorithms.terms.name" />
                                <input name="name" type="text" required />
                            </label>
                        </p>
                        <p>
                            <label>
                                <T k="algorithms.terms.type" />
                                <input type="text" required />
                            </label>
                        </p>
                        <p>
                            <label>
                                <T k="algorithms.terms.description" /> (optional)
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
                </Box>
            </Fragment>
        );
    }
}

export default NewAlgorithmPage;
