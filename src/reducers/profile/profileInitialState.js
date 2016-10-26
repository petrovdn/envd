/**
 * # profileInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'

const {Record} = require('immutable')

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 *
 * The originalProfile is what the server provided and has the objectId
 * The fields are what display on the UI
 */
const Form = Record({
  originalProfile: new (Record({
    inn: '',
    surname: '',
    name: '',
    middlename: '',
    adress: '',
    okved: '',
    phone: ''
  })),
  disabled: false,
  error: null,
  isValid: false,
  isChanged: false,
  isFetching: false,
  fields: new (Record({
    inn: '',
    surname: '',
    name: '',
    middlename: '',
    adress: '',
    okved: '',
    phone: ''
  }))
})

var InitialState = Record({
  form: new Form()
})

export default InitialState
