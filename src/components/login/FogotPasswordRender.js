
import ErrorAlert from '../components/ErrorAlert'

import React, {Component} from 'react'
import
{
  Text,
  TouchableHighlight,
  View
}
from 'react-native'

const t = require('tcomb-form-native')
let Form = t.form.Form

export default class extends Component {
  constructor (props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      value: {
        username: this.props.auth.form.fields.username,
        password: this.props.auth.form.fields.password
      }
    }
  }

  componentWillReceiveProps (nextprops) {
    this.setState({
      value: {
        username: nextprops.auth.form.fields.username,
        password: nextprops.auth.form.fields.password
      }
    })
  }

  onChange (value) {
    if (value.username !== '') {
      this.props.actions.onAuthFormFieldChange('username', value.username)
    }
    if (value.password !== '') {
      this.props.actions.onAuthFormFieldChange('password', value.password)
    }
    this.setState(
      {value}
    )
  }

  render () {
    let loginForm = t.struct({
      username: t.String,
      password: t.String
    })
    var options = {
      fields: {
        username: {
          label: 'Логин',
          maxLength: 30,
          editable: !this.props.form.isFetching,
          placeholder: 'Только почта или телефон'
        },
        password: {
          label: 'Пароль',
          maxLength: 12,
          secureTextEntry: true,
          editable: !this.props.form.isFetching
        }
      }
    }

    return (
      <View>
        <View>
          <Form ref='form'
            type={loginForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
        />
        </View>
        <TouchableHighlight onPress={this.props.onLoginPress()} underlayColor='#99d9f4'>
          <Text>Логин</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.gotoRegister()} underlayColor='#99d9f4'>
          <Text>Зарегистрироваться</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.gotoFogot()} underlayColor='#99d9f4'>
          <Text>Восстановить пароль</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
