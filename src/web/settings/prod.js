import Settings from '7s/utils/settings'

import baseSettings from './_base'
import genericSettings from 'settings/prod'
import ssSettings from '7s/web/settings/prod'

const settings = new Settings()

settings.update(ssSettings)
settings.update(genericSettings)
settings.update(baseSettings)

export default settings
