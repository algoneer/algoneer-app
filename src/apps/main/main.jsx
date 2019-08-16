import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';

import Header from './header/header.jsx';
import ErrorBoundary from './error-boundary.jsx';


class AlgoneerMain extends PureComponent {
    render(){
        return (
            <Fragment>
                <header
                    style={{
                        width: '100%',
                        height: '82px',
                    }}
                >
                    <Header />
                </header>
                <div
                    style={{
                        margin: '0 8%',
                    }}
                >
                    <ErrorBoundary>
                        {this.props.children}
                    </ErrorBoundary>
                </div>
            </Fragment>
        );
    }
}

AlgoneerMain.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AlgoneerMain;
