
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
        username: this.props.username,
        password: this.props.password
      }
    }
  }

  componentWillReceiveProps (nextprops) {
    // this.setState({
    //   value: {
    //     username: nextprops.auth.form.fields.username,
    //     password: nextprops.auth.form.fields.password
    //   }
    // })
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
    this.props.onLoginPress(this.state.value.username, this.state.value.password)
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
  //        editable: !this.props.form.isFetching,
          placeholder: 'Только почта или телефон'
        },
        password: {
          label: 'Пароль',
          maxLength: 12,
          secureTextEntry: true
    //      editable: !this.props.form.isFetching
        }
      }
    }

    return (
      <View style={{marginTop: 150}}>
        <View>
          <Form ref='form'
            type={loginForm}
            options={options}
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            />
        </View>
        <TouchableHighlight onPress={() => this.onSubmit()} underlayColor='#99d9f4'>
          <Text>Логин</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.gotoRegister} underlayColor='#99d9f4'>
          <Text>Зарегистрироваться</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.gotoFogot} underlayColor='#99d9f4'>
          <Text>Восстановить пароль</Text>
        </TouchableHighlight>

      </View>
    )
  }
}
