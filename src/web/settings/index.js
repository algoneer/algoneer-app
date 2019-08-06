import baseSettings from './base';
import genericSettings from 'settings';
import webSettings from '7s/web/settings';
import Settings from '7s/utils/settings';

const settings = new Settings();
settings.update(webSettings);
settings.update(genericSettings);
settings.update(baseSettings);

export default settings;
