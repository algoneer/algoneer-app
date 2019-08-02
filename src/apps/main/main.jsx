import React, {Fragment, PureComponent} from 'react';
import Content from '../content/content.jsx';
import { withActions } from '7s/components/store';
import { withRouter } from '7s/components/router';

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
                    <Content />
                </main>
            </Fragment>
        );
    }
}

export default withRouter(withActions(AlgoneerMain, ['user', 'version']))
