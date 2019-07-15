import {render} from  './index_common'
import settings from 'desktop/settings/test'

render(settings)

if (module.hot) {
  module.hot.accept(() => {
    render(settings)
  })
}
