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
const InitialState = require('./taskboxInitialState').default
const fieldValidation = require('../../lib/fieldValidation').default
const formValidation = require('./taskboxFormValidation').default

/**
 * ## Auth actions
 */
const {
  TASKLIST,
  TASKEDIT,
  TASKLIST_REQUEST,
  TASKLIST_SUCCESS,
  TASKLIST_FAILURE

 } = require('../../lib/constants').default

const initialState = new InitialState()
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */

export default function taskboxReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {

    case TASKLIST:
    case TASKEDIT:
      return formValidation(
        state.setIn(['form', 'state'], action.type)
        .setIn(['form', 'error'], null)
      )

    case TASKLIST_REQUEST:
      let nextState = state.setIn(['form', 'isFetching'], true)
      .setIn(['form', 'error'], null)
      return nextState

    case TASKLIST_SUCCESS:
      return state.setIn(['form', 'tasklist'], action.payload)
        .setIn(['form', 'isFetching'], false)
    case TASKLIST_FAILURE:
      return state.setIn(['form', 'isFetching'], false)
      .setIn(['form', 'error'], action.payload)
  }// switch
  /**
  * # Default
  */
  return state
}
