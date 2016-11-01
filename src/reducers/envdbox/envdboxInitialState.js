
'use strict'

import {Record} from 'immutable'
const {
  ENVDLIST,
  STEP5
} = require('../../lib/constants').default

const Form = Record({
  state: ENVDLIST,
  envdlist: [],
  Activitylist: [],
  disabled: false,
  error: 0,
  isValid: false,
  isFetching: false,
  isChanged: false,
  fields: new (Record({
    id: 0,
    inn: '',
    year: 0,
    name: '',
    lastName: '',
    patronymic: '',
    address: new (Record({
      subjectCode: 0,
      index: 0,
      district: '',
      city: '',
      town: '',
      street: '',
      house: '',
      building: '',
      flat: ''
    })),
    ifns: '',
    okved: '',
    activityType: 0,
    quarter: 0,
    k1: 0,
    k2: 0,
    factors: [0, 0, 0],
    taxBase: 0,
    taxRate: 0,
    insurancePayments: 0,
    taxDecrease: 0,
    taxBeforeInsurance: 0,
    taxToPay: 0
  }))
})

/**
 * ## InitialState
 * The form is set
 */
var InitialState = Record({
  formIm: new Form()
})

export default InitialState
