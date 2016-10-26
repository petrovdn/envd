
'use strict'
import {Actions} from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar'
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  Text,
  TouchableHighlight
}
from 'react-native'

import CONFIG from '../../lib/config'
let Theme = CONFIG.COLOR_SCHEME.SCHEME_CURRENT

export default class extends Component {
  onPressForvard (isCopy) {
    this.props.handleSteps('forvard', 'step2')
  }
  onPressBack () {
    this.props.handleSteps('back', 'step2')
  }

  render () {
    return (
      <View style={[styles.container, {backgroundColor: this.props.theme.COLOR_BACK}]}>
        <NavigationBar
          style={{backgroundColor: this.props.theme.COLOR_NAVBAR, height: 60}}
          title={{
            style: {fontSize: 20},
            title: 'Скопировать данные?',
            tintColor: 'white'
          }}
          leftButton={{
            title: '<=',
            tintColor: 'white',
            handler: this.onPressBack.bind(this)
          }} />
        <View style={[styles.containerData, {backgroundColor: this.props.theme.COLOR_BACK}]}>
          <Text style={styles.textBig}>Скопировать данные предыдущего периода ({this.props.quarter - 1} Квартал {this.props.year} года)?</Text>
          <TouchableHighlight style={{
            backgroundColor: this.props.theme.COLOR_BUTTON2,
            padding: 15,
            height: 60
          }}
            underlayColor='lavenderblush'
            onPress={() => this.onPressForvard(true)}>
            <Text style={styles.textButton}>Да, использовать данные предыдущего периода</Text>
          </TouchableHighlight>
          <Text style={styles.textSmall}> Информацию можно будет проверить и изменить</Text>
          <TouchableHighlight style={{
            backgroundColor: this.props.theme.COLOR_BUTTON2,
            padding: 15,
            height: 60
          }}
            underlayColor='lavenderblush'
            onPress={() => this.onPressForvard(false)}>
            <Text style={styles.textButton}>Нет, оформить декларацию заново</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerData: {
    padding: 20,
    justifyContent: 'center'
  },
  textButton: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textBig: {
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500'
  },
  textSmall: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 14
  }
})
