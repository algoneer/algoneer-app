import React, {PureComponent} from 'react';
import Header from './header/header.jsx';
import { withActions } from '7s/components/store';
import { withRouter } from '7s/components/router';

class AlgoneerMain extends PureComponent {
    render(){
        return (
            <header
                style={{
                    width: '100%',
                    height: '82px',
                }}
            >
                <Header />
            </header>
        );
    }
}

export default withRouter(withActions(AlgoneerMain, ['user', 'version']))
