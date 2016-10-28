
import ErrorAlert from '../../components/ErrorAlert'

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
        username: this.props.username
      }
    }
  }

  // componentWillReceiveProps (nextprops) {
  //   this.setState({
  //     value: {
  //       username: nextprops.auth.form.fields.username
  //     }
  //   })
  // }

  onChange (value) {
    if (value.username !== '') {
      this.props.actions.onAuthFormFieldChange('username', value.username)
    }
    this.setState(
      {value}
    )
  }

  onSubmit () {
    this.props.onRegisterPress(this.state.value.username)
  }

  render () {
    this.errorAlert.checkError(this.props.error)

    let registerForm = t.struct({
      username: t.String
    })
    var options = {
      fields: {
        username: {
          label: 'Логин',
          maxLength: 30,
  //        editable: !this.props.form.isFetching,
          placeholder: 'Только почта или телефон'
        }
      }
    }

    return (
      <View style={{marginTop: 150}}>
        <View>
          <Text>Форма регистрации</Text>
          <Form ref='form'
            type={registerForm}
            options={options}
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            />
        </View>
        <TouchableHighlight onPress={() => this.onSubmit()} underlayColor='#99d9f4'>
          <Text>Регистрация</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.gotoLogin} underlayColor='#99d9f4'>
          <Text>Войти</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.gotoFogot} underlayColor='#99d9f4'>
          <Text>Восстановить пароль</Text>
        </TouchableHighlight>

      </View>
    )
  }
}
