import Settings from '7s/utils/settings';

import baseSettings from './_base';
import ssSettings from '7s/settings/dev';
import worfSettings from 'worf/settings/prod';

const settings = new Settings();

settings.update(ssSettings);
settings.update(worfSettings);
settings.update(baseSettings);

settings.update(new Settings([
    ['algonautUrl', '//localhost:5001'],
]));


export default settings;
