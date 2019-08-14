import React, { Fragment, PureComponent } from 'react';

import emptyImage from './empty-image.png';

class Content extends PureComponent {
    render() {
        return (
            <Fragment>
                <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    You have not created any algorithms yet.
                </p>
                <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    <a href="/algorithms/new">Create your first algorithm.</a>
                </p>
                <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    <img
                        alt="A man in the water is surrounded by boxes and displays of a test environment. His testing went overboard."
                        src={emptyImage}
                    />
                </p>
            </Fragment>
        );
    }
}

export default Content;
