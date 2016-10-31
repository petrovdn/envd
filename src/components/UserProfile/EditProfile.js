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

class renderMainField extends React.Component {
  render () {
    const { lable, input: { value, onChange }, meta: { touched, error }, ...otherProps } = this.props
    console.log(touched)
    console.log(error)
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

class renderSeriesPassport extends React.Component {
  render () {
    const { lable, input: { value, onChange }, meta: { touched, error }, ...otherProps } = this.props
    console.log(touched)
    console.log(error)
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

class renderNumberPassport extends React.Component {
  render () {
    const { lable, input: { value, onChange }, meta: { touched, error }, ...otherProps } = this.props
    console.log(touched)
    console.log(error)
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


class EditProfile extends Component {

  constructor (props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.handleInitialize = this.handleInitialize.bind(this)
  }

  componentDidMount () {
    this.handleInitialize()
  }

  handleInitialize () {
    const initData = {
      'fullname': 'Диман Диманович'
      // 'fullname': this.props.userInfo.fullname
      // 'birthdate': this.birthdate,
      // 'passport_series': this.passport_series,
      // 'passport_number': this.passport_number,
      // 'passport_issued_by': this.passport_issued_by,
      // 'passport_issued_date': this.passport_issued_date,
      // 'email': this.email,
      // 'phone': this.phone
    }
    initialize(initData)
  }

  handlePress (val) {
    var data = {
      fullname: this.fullname.value,
      birthdate: this.birthdate.value,
      passport_series: this.passport_series.value,
      passport_number: this.passport_number.value,
      passport_issued_by: this.passport_issued_by.value,
      passport_issued_date: this.passport_issued_date.value,
      email: this.email.value,
      phone: this.phone.value
    }
  //  this.props.updateProfile(this.props.token, data)
  }

  render () {
    this.errorAlert.checkError(this.props.error)
    return (
      <View style={styles.container}>
        <Field
          defaultValue={this.props.userInfo.fullname}
          id='fullname'
          name='fullname'
          ref={(input) => (this.fullname = input)}
          lable='Фамилия Имя отчество'
          component={renderMainField}
          />
        <Field
          defaultValue={this.props.userInfo.birthdate}
          id='birthdate'
          name='birthdate'
          ref={(input) => (this.birthdate = input)}
          lable='Дата рождения'
          component={renderMainField}
          />
        <View className='form-group'>
          <Field
            defaultValue={this.props.userInfo.passport_series}
            id='passport_series'
            name='passport_series'
            ref={(input) => (this.passport_series = input)}
            lable='Серия'
            component={renderSeriesPassport}
          />
          <Field
            defaultValue={this.props.userInfo.passport_number}
            className='form-control'
            id='passport_number'
            name='passport_number'
            ref={(input) => (this.passport_number = input)}
            lable='Номер паспорта'
            component={renderNumberPassport}
          />
        </View>
        <View>
          <Field
            defaultValue={this.props.userInfo.passport_issued_by}
            className='form-control'
            id='passport_issued_by'
            name='passport_issued_by'
            ref={(input) => (this.passport_issued_by = input)}
            lable='Кем выдан'
            component={renderMainField}
            />
          <Field
            defaultValue={this.props.userInfo.passport_issued_date}
            className='form-control'
            id='passport_issued_date'
            name='passport_issued_date'
            ref={(input) => (this.passport_issued_date = input)}
            lable='Когда выдан'
            component={renderMainField}
            />
        </View>
        <View className='col-md-4 col-md-offset-1'>
          <Field
            defaultValue={this.props.userInfo.email}
            className='form-control'
            id='email'
            name='email'
            ref={(input) => (this.email = input)}
            lable='E-mail'
            component={renderMainField}
            />
          <Field
            defaultValue={this.props.userInfo.phone}
            className='form-control'
            id='phone'
            name='phone'
            ref={(input) => (this.phone = input)}
            lable='Телефон'
            component={renderMainField}
            />
        </View>
        <View>
          <TouchableHighlight style={styles.submitButton} onPress={() => this.handlePress()}>
            <Text>Обновить профиль</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

function validate (formProps) {
  const errors = {}
  if (!formProps.fullname) {
    errors.fullname = 'Поле обязательно для заполнения'
  } else if (!/^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)? [А-ЯЁ][а-яё]+( [А-ЯЁ][а-яё]+)?$/.test(formProps.fullname)) {
    errors.fullname = 'Заполните ФИО полностью'
  }
  if (isNaN(Number(formProps.birthdate))) {
    errors.birthdate = 'Введите число'
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
  form: 'EditProfile',
  validate,
  touchOnChange: true,
  fields: ['fullname', 'birthdate']
})
export default form(EditProfile)
