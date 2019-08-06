import baseSettings from './_base';
import genericSettings from 'settings/dev';
import ssSettings from '7s/desktop/settings/dev';
import Settings from '7s/utils/settings';

const settings = new Settings();
settings.update(ssSettings);
settings.update(genericSettings);
settings.update(baseSettings);

export default settings;
