/**
 * # authFormValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict'

/**
 * ## Imports
 * the actions being addressed
 */
const {
  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../../lib/constants').default

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation (state) {
  switch (state.formIm.state) {
    /**
     * ### Logout has no fields, so always valid
     */
    case LOGOUT:
      return state.setIn(['formIm', 'isValid'], true)
    /**
     * ### Registration has 4 fields
     */
    case REGISTER:
      if (state.formIm.fields.username !== '' &&
          !state.formIm.fields.usernameHasError) {
        return state.setIn(['formIm', 'isValid'], true)
      } else {
        return state.setIn(['formIm', 'isValid'], false)
      }
    /**
     * ### Login has 2 fields
     */
    case LOGIN:
      if (state.formIm.fields.username !== '' &&
          state.formIm.fields.password !== '' &&
          !state.formIm.fields.usernameHasError &&
          !state.formIm.fields.passwordHasError) {
        return state.setIn(['formIm', 'isValid'], true)
      } else {
        return state.setIn(['formIm', 'isValid'], false)
      }
    /**
     * ### Reset password has 1 field
     */
    case FORGOT_PASSWORD:
      if (state.formIm.fields.email !== '' &&
        !state.formIm.fields.emailHasError) {
        return state.setIn(['formIm', 'isValid'], true)
      } else {
        return state.setIn(['formIm', 'isValid'], false)
      }

  }
  /**
   * Default, return the state
   */
  return state
}
