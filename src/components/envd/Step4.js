
'use strict'
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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ErrorAlert from '../../components/ErrorAlert'

import t from 'tcomb-form-native'
let Form = t.form.Form
import formStylesheet from '../envd/formStylesheet4'

import CONFIG from '../../lib/config'
let Theme = CONFIG.COLOR_SCHEME.SCHEME_CURRENT

export default class extends Component {
  constructor (props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      value: props
    }
  }
  onChange (value) {
    this.setState({ value })
  }

  onPressForvard () {
    this.props.handleSteps('forvard', 'step4', this.state.value)
  }
  onPressBack () {
    this.props.handleSteps('back', 'step4')
  }

  render () {
    let Step4Form = t.struct({
      city: t.String,
      street: t.String,
      house: t.String,
      building: t.String,
      flat: t.String
    })
    let options = {
      auto: 'none',
      stylesheet: formStylesheet,
      fields: {
        city: {placeholder: 'Город, населенный пункт'},
        street: {placeholder: 'Улица'},
        house: {placeholder: 'Дом'},
        building: {placeholder: 'Корпус'},
        flat: {placeholder: 'Квартира'}
      }
    }

    return (
      <View style={[styles.container, {backgroundColor: this.props.theme.COLOR_BACK}]}>
        <NavigationBar
          style={{backgroundColor: this.props.theme.COLOR_NAVBAR, height: 60}}
          title={{
            style: {fontSize: 20},
            title: 'Адрес деятельности',
            tintColor: 'white'
          }}
          leftButton={{
            title: '<=',
            tintColor: 'white',
            handler: this.onPressBack.bind(this)
          }} />
        <KeyboardAwareScrollView>
          <View style={styles.inputs}>
            <Form
              ref='form'
              type={Step4Form}
              options={options}
              value={this.state.value}
              onChange={this.onChange.bind(this)}
                />
          </View>
        </KeyboardAwareScrollView>
        <TouchableHighlight style={{
          backgroundColor: this.props.theme.COLOR_BUTTON2,
          padding: 15,
          height: 60
        }}
          underlayColor='lavenderblush'
          onPress={() => this.onPressForvard()}>
          <Text style={styles.textButton}>2 / 6      ПРОДОЛЖИТЬ</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  inputs: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowOpacity: 20,
    shadowRadius: 5
  },
  textButton: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
