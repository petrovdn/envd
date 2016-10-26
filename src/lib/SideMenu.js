
'use strict'
import NavigationBar from 'react-native-navbar'
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image
}
from 'react-native'

import t from 'tcomb-form-native'
let Form = t.form.Form

import {Actions} from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as envdboxActions from '../reducers/envdbox/envdboxActions'
import * as globalActions from '../reducers/global/globalActions'
import * as deviceActions from '../reducers/device/deviceActions'

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...envdboxActions, ...globalActions, ...deviceActions }, dispatch)
  }
}

function mapStateToProps (state) {
  return {
    global: {
      currentUser: state.global.currentUser,
    }
  }
}

class SideMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: null
    }
  }


  onPress (state) {
    switch (state) {
      case 'ENVD':
        Actions.EnvdBox()
        break
      case 'Profile':
        Actions.Profile()
        break
      case 'Logout':
        Actions.Logout()
        break
    }
    this.props.closeDrawer()
  }
  onChangeTheme (theme) {
    this.props.actions.setCurrendTheme(Number(theme.theme))
    this.props.closeDrawer()
  }
  initializeServer () {
    this.props.actions.initializeServer(this.props.global.currentUser)
  }
  render () {
    var theme = t.enums({
      1: 'Цветовая схема 1',
      2: 'Цветовая схема 2',
      3: 'Цветовая схема 3',
      4: 'Цветовая схема 4',
      5: 'Цветовая схема 5'
    })

    var Theme = t.struct({
      theme: theme
    })
    var options = {
      fields: {
        theme: {
          label: 'Цветовая схема'
        }
      }
    }

    return (
      <View style={styles.container}>
      <Image style={styles.logo}
        source={require('../images/logo.png')}
    />
        <TouchableHighlight style={styles.button}
          underlayColor='lavenderblush'
          onPress={() => this.onPress('ENVD')}>
          <Text style={styles.textButton}>Отчетность ЕНВД</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
          underlayColor='lavenderblush'
          onPress={() => this.onPress('Profile')}>
          <Text style={styles.textButton}>Профиль</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
          underlayColor='lavenderblush'
          onPress={() => this.onPress('Logout')}>
          <Text style={styles.textButton}>Выйти</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
          underlayColor='lavenderblush'
          onPress={() => this.initializeServer()}>
          <Text style={styles.textButton}>Инициализировать сервер</Text>
        </TouchableHighlight>
        <Form
          ref='form'
          type={Theme}
          options={options}
          value={this.state.theme}
          onChange={this.onChangeTheme.bind(this)}
          />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    margin: 10,
    padding: 5
  },
  textButton: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '500'
  },
  logo: {
    alignSelf: 'center',
    margin: 20,
    height: 70,
    width: 70
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
