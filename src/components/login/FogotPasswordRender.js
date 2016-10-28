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

  componentWillReceiveProps (nextprops) {
    this.setState({
      value: {
        username: nextprops.auth.form.fields.username
      }
    })
  }

  onChange (value) {
    // if (value.username !== '') {
    //   this.props.actions.onAuthFormFieldChange('username', value.username)
    // }
    // if (value.password !== '') {
    //   this.props.actions.onAuthFormFieldChange('password', value.password)
    // }
    this.setState(
      {value}
    )
  }

  onSubmit () {
    this.props.onFogotPress(this.state.value.username)
  }

  render () {
    this.errorAlert.checkError(this.props.error)
    let fogotForm = t.struct({
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
          <Text>Форма восстановления пароля</Text>
          <Form ref='form'
            type={fogotForm}
            options={options}
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            />
        </View>
        <TouchableHighlight onPress={() => this.onSubmit()} underlayColor='#99d9f4'>
          <Text>Восстановить пароль</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.gotoLogin} underlayColor='#99d9f4'>
          <Text>Войти</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.gotoRegister} underlayColor='#99d9f4'>
          <Text>Зарегистрироваться</Text>
        </TouchableHighlight>

      </View>
    )
  }
}
