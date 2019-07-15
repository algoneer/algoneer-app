import {render} from  './index_common'
import settings from 'web/settings/test'

render(settings)

if (module.hot) {
  module.hot.accept(() => {
    render(settings)
  })
}
