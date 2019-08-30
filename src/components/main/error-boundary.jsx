import React from 'react';
import PropTypes from 'prop-types';


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() { // error
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error(error);
        console.error(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div style={{ textAlign: 'center' }}>
                    <h1>Something went wrong.</h1>
                    <p>
                        {'You can report the bug on '}
                        <a href="https://github.com/algoneer/algoneer-app/issues">
                            {`Algoneer's GitHub page`}
                        </a>
                        .
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
