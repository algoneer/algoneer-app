//our own styles

import 'scss/main.scss'

import Settings from '7s/utils/settings'
import {convertYAMLTranslations} from '7s/utils/i18n'
import yamlTranslations from './translations'
import logo from 'assets/images/logo.png'
import menu from 'components/menu'
import routes from 'routes'
import actions from 'actions'
import apis from 'apis'

const settings = new Settings([
  ['title', '7s-ui Example'],
  ['logo', logo],
  ['menu', menu],
  ['routes', routes],
  ['lang', 'en'],
  ['translations', convertYAMLTranslations(yamlTranslations)],
  ['showTitles', true],
  ['apis', apis],
  ['actions', actions],
  ['commitSHA', COMMIT_SHA],
])

export default settings
