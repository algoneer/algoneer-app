import React from 'react';
import { A, T } from '7s/components';

import emptyImage from './empty-image.png';

const Empty = () => {
    document.documentElement.classList.remove('background-algoneer');
    return (
        <div
            style={{
                fontWeight: 'bold',
                lineHeight: 2,
                marginTop: '20vh',
                textAlign: 'center',
            }}
        >
            <p >
                <T k="projects.empty.no-projects" />
            </p>
            <p>
                <A href="https://docs.algoneer.org/getting_started.html"><T k="projects.empty.create-first" /></A>
            </p>
            <p>
                <img
                    alt="A man in the water is surrounded by boxes and displays of a test environment. His testing went overboard."
                    src={emptyImage}
                    style={{
                        width: '629px',
                        maxWidth: '100%',
                    }}
                />
            </p>
        </div>
    );
};

export default Empty;
