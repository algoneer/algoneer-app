import React, {Fragment, PureComponent} from 'react';

import Header from './header/header.jsx';


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
                <main
                    style={{
                        margin: '0 8%',
                    }}
                >
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default AlgoneerMain;
