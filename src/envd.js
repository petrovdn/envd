import React, {Component} from 'react'
import {
    StyleSheet,
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
import Login from './containers/Login'
import Logout from './containers/Logout'
import Register from './containers/Register'
import ForgotPassword from './containers/ForgotPassword'
import Profile from './containers/Profile'
import EnvdBox from './containers/EnvdBox'
import MyDrawer from './lib/MyDrawer'

import Icon from 'react-native-vector-icons/FontAwesome'

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

class TabIcon extends React.Component {
  render () {
    var color = this.props.selected ? 'black' : 'green'
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
        <Icon style={{color: color}} name={this.props.iconName} size={30} />
        <Text style={{color: color}}>{this.props.title}</Text>
      </View>
         )
  }
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
            <Scene key='drawer' component={MyDrawer} open={false} >
              <Scene key='Tabbar' tabs >
                <Scene key='EnvdBox' component={EnvdBox} hideNavBar
                  titleStyle={{ color: 'white' }} />
                <Scene key='Profile' component={Profile} sceneStyle={{marginTop: 50}} />
                <Scene key='Logout'component={Logout} sceneStyle={{marginTop: 50}} />
              </Scene>
            </Scene>
            <Scene key='App' component={App} type='replace' initial />
            <Scene key='InitialLoginForm' component={Login} hideTabBar />
            <Scene key='Login' component={Login} hideTabBar />
            <Scene key='Register' component={Register} />
            <Scene key='ForgotPassword' component={ForgotPassword} />
          </Scene>
        </Router>
      </Provider>
    )
  }
}

export default envd
