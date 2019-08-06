/* global module */
import {render} from  './index_common';
import settings from 'desktop/settings/dev';

render(settings);

if (module.hot) {
    module.hot.accept(() => {
        render(settings);
    });
}
