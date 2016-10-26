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
  ENVDLIST,
  ENVDEDIT
} = require('../../lib/constants').default

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation (state) {
  switch (state.form.state) {
    /**
     * ### tasklist has no fields, so always valid
     */
    case ENVDLIST:
      return state.setIn(['form', 'isValid'], true)
    /**
     * ### Registration has 4 fields
     */
    case ENVDEDIT:
    /**
     * ### taskedit has no fields, so always valid
     */
      return state.setIn(['form', 'isValid'], false)
  }
  /**
   * Default, return the state
   */
  return state
}
