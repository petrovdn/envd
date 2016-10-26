
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

import ErrorAlert from '../../components/ErrorAlert'
import formStylesheet from '../envd/formStylesheet1'

import t from 'tcomb-form-native'
let Form = t.form.Form

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    this.props.handleSteps('forvard', 'step1', this.state.value)
  }
  onPressBack () {
    this.props.handleSteps('back', 'step1')
  }

  render () {
    let Step1Form = t.struct({
      inn: t.Number,
      lastName: t.String,
      name: t.String,
      patronymic: t.String,
      okved: t.String
    })
    let options = {
      stylesheet: formStylesheet,
      fields: {
        inn: {
          label: 'ИНН',
          maxLength: 12
        },
        lastName: {
          label: 'Фамилия'
        },
        name: {
          label: 'Имя'
        },
        patronymic: {
          label: 'Отчество'
        },
        okved: {
          label: 'ОКВЭД'
        }
      }
    }

    return (
      <View style={[styles.container, {backgroundColor: this.props.theme.COLOR_BACK}]}>
        <NavigationBar
          style={{backgroundColor: this.props.theme.COLOR_NAVBAR, height: 60}}
          title={{
            style: {fontSize: 20},
            title: 'Реквизиты ИП',
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
            type={Step1Form}
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
          <Text style={styles.textButton}>     ПРОДОЛЖИТЬ</Text>
        </TouchableHighlight>

      </View>
    )
  }
}

var Theme
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  inputs: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
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
