
'use strict'
const {Record} = require('immutable')
const {
  LOGIN
} = require('../../lib/constants').default

const Form = Record({
  state: LOGIN,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: new (Record({
    username: '',
    usernameHasError: false,
    usernameErrorMsg: '',
    password: '',
    passwordHasError: false,
    passwordErrorMsg: ''
  }))
})

var InitialState = Record({
  form: new Form()
})
export default InitialState
