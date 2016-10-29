
'use strict'

const {Record} = require('immutable')
const {
 MYPROFILE
} = require('../../lib/constants').default

const Form = Record({
  state: MYPROFILE,
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
