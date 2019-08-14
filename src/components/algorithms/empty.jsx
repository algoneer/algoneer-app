import React, { PureComponent } from 'react';
import { T } from '7s/components';

import emptyImage from './empty-image.png';

class Empty extends PureComponent {
    render() {
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
                    <T k="algorithms.empty.no-algorithms" />
                </p>
                <p>
                    <a href="/algorithms/new"><T k="algorithms.empty.create-first" /></a>
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
    }
}

export default Empty;
