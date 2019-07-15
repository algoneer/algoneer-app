import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/app'
import StoreProvider from '7s/components/store'
import RouterProvider from '7s/components/router'
import SettingsProvider from '7s/components/settings'

const appElement = document.getElementById('app')

export const render = settings => {
    settings.get('router').init(settings.get('routes'))
    ReactDOM.render(
      <SettingsProvider settings={settings}>
        <StoreProvider store={settings.get('store')}>
          <RouterProvider router={settings.get('router')}>
            <App menu={settings.get('menu')} />
          </RouterProvider>
        </StoreProvider>         
      </SettingsProvider>
  ,
  appElement
  )
}