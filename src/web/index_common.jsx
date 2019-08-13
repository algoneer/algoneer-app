import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/app';
import Store from '7s/components/store';
import Router from '7s/components/router';
import Settings, { ExternalSettings } from '7s/components/settings';

const appElement = document.getElementById('app');

export const render = settings => {
    settings.get('router').init(settings.get('routes'));
    ReactDOM.render(
        <Settings settings={settings}>
            <Store store={settings.get('store')}>
                <ExternalSettings>
                    <Router router={settings.get('router')}>
                        <App menu={settings.get('menu')} />
                    </Router>
                </ExternalSettings>
            </Store>
        </Settings>
        ,
        appElement
    );
};
