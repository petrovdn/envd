/**
 * # app.js
 *  Display startup screen and
 *  getSessionTokenAtStartup which will navigate upon completion
 *
 *
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Project actions
 */
import * as authActions from '../reducers/auth/authActions'
import * as deviceActions from '../reducers/device/deviceActions'
import * as globalActions from '../reducers/global/globalActions'

/**
 * The components we need from ReactNative
 */
import React from 'react'
import
{
    StyleSheet,
    ActivityIndicator,
    View,
    Image
}
from 'react-native'

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header'

/**
 *  Save that state
 */
function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version,
    auth: {
      form: {
        isFetching: state.auth.formIm.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
};

/**
 * Bind all the actions from authActions, deviceActions and globalActions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...deviceActions, ...globalActions }, dispatch)
  }
}

/**
 * ## App class
 */
var reactMixin = require('react-mixin')
import TimerMixin from 'react-timer-mixin'
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

let App = React.createClass({
    /**
     * See if there's a sessionToken from a previous login
     *
     */
  componentDidMount () {
        // Use a timer so App screen is displayed
    this.setTimeout(
            () => {
              this.props.actions.getSessionToken()
            },
            2500
        )
  },

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.mark}
          source={require('../images/logo.png')}
      />
      <View style={{margin: 30}}>
       <ActivityIndicator
        animating
        color = 'rgb(252, 100, 75)'
        size='small'
         />
      </View>
        </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  mark: {
    height: 150,
    width: 150
  }
})

// Since we're using ES6 classes, have to define the TimerMixin
reactMixin(App.prototype, TimerMixin)
/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)
