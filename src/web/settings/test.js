import baseSettings from './_base'
import genericSettings from 'settings/test'
import ssSettings from '7s/web/settings/test'
import Settings from '7s/utils/settings'

const settings = new Settings()
settings.update(ssSettings)
settings.update(genericSettings)
settings.update(baseSettings)

export default settings
