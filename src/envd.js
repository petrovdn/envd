import React, {Component} from 'react'
import {
    View,
    Text } from 'react-native'
import {
    Router,
    Scene } from 'react-native-router-flux'

import {Provider} from 'react-redux'

import configureStore from './lib/configureStore'

var I18n = require('react-native-i18n')

import Translations from './lib/Translations'
I18n.translations = Translations
// Support fallbacks so en-US & en-BR both use en
I18n.fallbacks = true
I18n.Locale = 'ru'

import App from './containers/App'
import LoginBox from './containers/LoginBox'
import Logout from './containers/Logout'
import Profile from './containers/Profile'
import UserProfileBox from './containers/UserProfileBox'
import EnvdBox from './containers/EnvdBox'
import MyDrawer from './lib/MyDrawer'

import {setPlatform, setVersion, setCurrendTheme} from './reducers/device/deviceActions'
import {setStore} from './reducers/global/globalActions'

import AuthInitialState from './reducers/auth/authInitialState'
import DeviceInitialState from './reducers/device/deviceInitialState'
import GlobalInitialState from './reducers/global/globalInitialState'
import ProfileInitialState from './reducers/profile/profileInitialState'
import TaskBoxInitialState from './reducers/taskbox/taskboxInitialState'
import EnvdBoxInitialState from './reducers/envdbox/envdboxInitialState'

import pack from '../package'
var VERSION = pack.version

function getInitialState () {
  const _initState = {
    auth: new AuthInitialState(),
    device: (new DeviceInitialState()).set('isMobile', true),
    global: new GlobalInitialState(),
    profile: new ProfileInitialState(),
    taskbox: new TaskBoxInitialState(),
    envdbox: new EnvdBoxInitialState()
  }
  return _initState
}

class envd extends Component {
  render () {
    const store = configureStore(getInitialState())

    store.dispatch(setVersion(VERSION))
    store.dispatch(setStore(store))
    store.dispatch(setPlatform('ios'))
    store.dispatch(setCurrendTheme(1))

    return (
      <Provider store={store}>
        <Router>
          <Scene key='root'>
            <Scene key='App' component={App} type='replace' hideNavBar initial />
            <Scene key='UserProfileBox' component={UserProfileBox} />
            <Scene key='LoginBox' type='replace' component={LoginBox} hideNavBar />
            <Scene key='drawer' component={MyDrawer} open={false} >
              <Scene key='Tabbar' tabs >
                <Scene key='EnvdBox' component={EnvdBox} hideNavBar
                  titleStyle={{ color: 'white' }} />
                <Scene key='Profile' component={Profile} sceneStyle={{marginTop: 50}} />
                <Scene key='Logout'component={Logout} sceneStyle={{marginTop: 50}} />
              </Scene>
            </Scene>
          </Scene>
        </Router>
      </Provider>
    )
  }
}

export default envd

// <Provider store={store}>
//   <Router>
//     <Scene key='root'>
//       <Scene key='App' component={App} type='replace' initial />
//       <Scene key='LoginBox' component={LoginBox} hideTabBar />
//       <Scene key='drawer' component={MyDrawer} open={false} >
//         <Scene key='Tabbar' tabs >
//           <Scene key='EnvdBox' component={EnvdBox} hideNavBar
//             titleStyle={{ color: 'white' }} />
//           <Scene key='Profile' component={Profile} sceneStyle={{marginTop: 50}} />
//           <Scene key='Logout'component={Logout} sceneStyle={{marginTop: 50}} />
//         </Scene>
//       </Scene>
//     </Scene>
//   </Router>
// </Provider>
