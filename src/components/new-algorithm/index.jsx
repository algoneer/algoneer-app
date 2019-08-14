import React, { PureComponent, Fragment } from 'react';
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
                    <h1>Create algorithm</h1>
                    <form>
                        <p>
                            <label>
                                Algorithm owner
                                <select name="owner" disabled value="myself">
                                    <option value="myself">myself</option>
                                </select>
                            </label>
                            <label>
                                Algorithm name
                                <input name="name" type="text" required />
                            </label>
                        </p>
                        <p>
                            <label>
                                Algorithm description (optional)
                                <textarea type="text" />
                            </label>
                        </p>
                        <p>
                            <label>
                                Algorithm type
                                <input type="text" required />
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
