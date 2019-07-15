import Settings from '7s/utils/settings'

import baseSettings from './_base'
import ssSettings from '7s/settings/prod'
import worfSettings from 'worf/settings/prod'

const settings = new Settings()

settings.update(baseSettings)
settings.update(ssSettings)
settings.update(worfSettings)

settings.update(new Settings([
    ['apiUrl', 'https://tie.dcso.de/api'],
]))

export default settings