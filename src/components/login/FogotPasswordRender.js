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

import { Field, reduxForm, initialize } from 'redux-form'

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
class FogotPasswordRender extends Component {

  constructor (props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.handleInitialize = this.handleInitialize.bind(this)
  }

  componentDidMount () {
    this.handleInitialize()
  }

  onSubmit () {
    this.props.onFogotPress(this.login.value)
  }

  handleInitialize () {
    const initData = {
      'login': this.props.login
    }
    initialize(initData)
  }

  render () {
    this.errorAlert.checkError(this.props.error)
    return (
      <View style={{marginTop: 150}}>
        <View>
          <Text>Форма восстановления пароля</Text>
          <Field
            defaultValue={this.props.username}
            id='login'
            name='login'
            ref={(input) => (this.login = input)}
            lable='Логин'
            placeholder='Только почта или телефон'
            component={inputLogin}
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
  form: 'FogotPasswordRender',
  validate,
  touchOnChange: true
})
export default form(FogotPasswordRender)
