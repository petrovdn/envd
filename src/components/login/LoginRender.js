
import ErrorAlert from '../../components/ErrorAlert'

import React, {Component} from 'react'
import
{
  Text,
  TouchableHighlight,
  View,
  TextInput,
  StyleSheet
}
from 'react-native'

import { Field, reduxForm, initialize } from 'redux-form/immutable'

class inputLogin extends React.Component {
  render () {
    const { lable, input: { value, onChange }, meta: { touched, error }, ...otherProps } = this.props
    return (
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>{lable}</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(value) => onChange(value)}
          value={value}
          underlineColorAndroid='transparent'
          selectTextOnFocus
          {...otherProps}
        />
        {touched && error && <Text style={styles.textDanger}>{error}</Text>}
      </View>
    )
  }
}

class inputPassword extends React.Component {
  render () {
    const { lable, input: { value, onChange }, meta: { touched, error }, ...otherProps } = this.props
    return (
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>{lable}</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(value) => onChange(value)}
          value={value}
          underlineColorAndroid='transparent'
          selectTextOnFocus
          {...otherProps}
        />
        {touched && error && <Text style={styles.textDanger}>{error}</Text>}
      </View>
    )
  }
}

class LoginRender extends Component {

  constructor (props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.handleInitialize = this.handleInitialize.bind(this)
  }

  componentDidMount () {
    this.handleInitialize()
  }

  onSubmit () {
    this.props.onLoginPress(this.login.value, this.password.value)
  }

  handleInitialize () {
    const initData = {
      'login': this.props.login,
      'password': this.props.password
    }
    initialize(initData)
  }

  render () {
    this.errorAlert.checkError(this.props.error)
    return (
      <View style={{marginTop: 150}}>
        <View>
          <Text>Форма логина</Text>
          <Field
            defaultValue={this.props.username}
            id='login'
            name='login'
            ref={(input) => (this.login = input)}
            lable='Логин'
            placeholder='Только почта или телефон'
            component={inputLogin}
            />
          <Field
            defaultValue={this.props.password}
            id='password'
            name='password'
            ref={(input) => (this.password = input)}
            lable='Пароль'
            component={inputPassword}
            secureTextEntry
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

function validate (formProps) {
  const errors = {}
  if (!formProps.login) {
    errors.login = 'не может быть пустым'
  }
  return errors
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  formInput: {
    padding: 10,
    height: 40,
    borderRadius: 8,
    borderWidth: 1
  },
  formLabel: {
    fontSize: 16
  },
  textDanger: {
    fontSize: 10,
    color: 'red'
  },
  submitButton: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'grey'
  }
})

const form = reduxForm({
  form: 'LoginRender',
  validate,
  touchOnChange: true
})
export default form(LoginRender)
