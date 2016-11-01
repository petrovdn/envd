/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('./envdboxInitialState').default

/**
 * ## Auth actions
 */
const {
  ENVDLIST,
  STEP1,
  STEP2,
  STEP3,
  STEP4,
  STEP5,
  STEP6,
  STEP7,
  STEP8,

  ADD_STEP1_DATA,
  ADD_STEP2_DATA,
  ADD_STEP3_DATA,
  ADD_STEP4_DATA,
  ADD_STEP5_DATA,
  ADD_STEP6_DATA,
  ADD_STEP7_DATA,

  ENVDLIST_REQUEST,
  ENVDLIST_SUCCESS,
  ENVDLIST_FAILURE,

  GETENVD_REQUEST,
  GETENVD_SUCCESS,
  GETENVD_FAILURE,

  ADDENVD_REQUEST,
  ADDENVD_SUCCESS,
  ADDENVD_FAILURE,

  ACTIVITY_LIST_REQUEST,
  ACTIVITY_LIST_SUCCESS,
  ACTIVITY_LIST_FAILURE

 } = require('../../lib/constants').default

const initialState = new InitialState()
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */

export default function envdboxReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {

   // Навигация внутри блока, навигация между блоками выполняется при помощи router-flux
    case ENVDLIST:
    case STEP1:
    case STEP2:
    case STEP3:
    case STEP4:
    case STEP5:
    case STEP6:
    case STEP7:
    case STEP8:
      return state.setIn(['formIm', 'state'], action.type)
        .setIn(['formIm', 'error'], null)

    case ADD_STEP1_DATA:
      return state.setIn(['formIm', 'fields', 'inn'], action.payload.inn)
      .setIn(['formIm', 'fields', 'lastName'], action.payload.lastName)
      .setIn(['formIm', 'fields', 'name'], action.payload.name)
      .setIn(['formIm', 'fields', 'patronymic'], action.payload.patronymic)
      .setIn(['formIm', 'fields', 'okved'], action.payload.okved)
        .setIn(['formIm', 'error'], null)
    case ADD_STEP3_DATA:
      return state.setIn(['formIm', 'fields', 'activityType'], action.payload.activityType)
      .setIn(['formIm', 'fields', 'taxBase'], action.payload.taxBase)
        .setIn(['formIm', 'error'], null)

    case ADD_STEP4_DATA:
      return state.setIn(['formIm', 'fields', 'address', 'city'], action.payload.city)
      .setIn(['formIm', 'fields', 'address', 'street'], action.payload.street)
      .setIn(['formIm', 'fields', 'address', 'house'], action.payload.house)
      .setIn(['formIm', 'fields', 'address', 'building'], action.payload.building)
      .setIn(['formIm', 'fields', 'address', 'flat'], action.payload.flat)
        .setIn(['formIm', 'error'], null)

    case ADD_STEP5_DATA:
      var factors = [action.payload.data.factor1, action.payload.data.factor2, action.payload.data.factor3]
      return state.setIn(['formIm', 'fields', 'factors'], factors)
          .setIn(['formIm', 'fields', 'k2'], action.payload.data.k2)
          .setIn(['formIm', 'fields', 'taxRate'], action.payload.data.taxRate)
          .setIn(['formIm', 'fields', 'taxBeforeInsurance'], action.payload.tax)
          .setIn(['formIm', 'error'], null)

    case ADD_STEP6_DATA:
      return state
        .setIn(['formIm', 'fields', 'insurancePayments'], action.payload.insurancePayments)
          .setIn(['formIm', 'fields', 'taxDecrease'], action.payload.taxDecrease)
          .setIn(['formIm', 'fields', 'taxToPay'], action.payload.taxToPay)
          .setIn(['formIm', 'error'], null)

    case ENVDLIST_REQUEST:
    case GETENVD_REQUEST:
      let nextState = state.setIn(['formIm', 'isFetching'], true)
      .setIn(['formIm', 'error'], null)
      return nextState

    case ENVDLIST_SUCCESS:
      let envdlist = []
      for (var i = 0; i < action.payload.length; i++) {
        var data = action.payload[i].data
        var parse = JSON.parse(data)
        let envdRow = []
        envdRow[0] = parse.userData.id
        envdRow[1] = parse.userData.year
        envdRow[2] = parse.userData.quarter
        envdRow[3] = parse.userData.activityType
        envdlist.push(envdRow)
      }
      return state.setIn(['formIm', 'envdlist'], envdlist)
        .setIn(['formIm', 'isFetching'], false)

    case GETENVD_SUCCESS:
      return state
    .setIn(['formIm', 'fields', 'id'], action.payload.data.id)
    .setIn(['formIm', 'fields', 'year'], action.payload.data.year)
    .setIn(['formIm', 'fields', 'quarter'], action.payload.data.quarter)
    .setIn(['formIm', 'fields', 'k1'], action.payload.k1)
    .setIn(['formIm', 'error'], null)

    case ENVDLIST_FAILURE:
    case GETENVD_FAILURE:
      return state.setIn(['formIm', 'isFetching'], false)
      .setIn(['formIm', 'error'], action.payload)

    case ACTIVITY_LIST_REQUEST:
      return state.setIn(['formIm', 'isFetching'], true)
        .setIn(['formIm', 'error'], null)

    case ACTIVITY_LIST_SUCCESS:
      return state.setIn(['formIm', 'Activitylist'], action.payload)
          .setIn(['formIm', 'isFetching'], false)

    case ACTIVITY_LIST_FAILURE:
      return state.setIn(['formIm', 'isFetching'], false)
      .setIn(['formIm', 'error'], action.payload)
  }// switch
  /**
  * # Default
  */
  return state
}
