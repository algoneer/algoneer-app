import Settings from '7s/utils/settings';

import baseSettings from './_base';
import ssSettings from '7s/settings/test';
import worfSettings from 'worf/settings/test';

const settings = new Settings();

settings.update(ssSettings);
settings.update(worfSettings);
settings.update(baseSettings);

export default settings;
