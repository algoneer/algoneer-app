import Settings from '7s/utils/settings'

import baseSettings from './_base'
import ssSettings from '7s/settings/test'
import worfSettings from 'worf/settings/test'

const settings = new Settings()

settings.update(baseSettings)
settings.update(ssSettings)
settings.update(worfSettings)

export default settings
