/**
 * # profileFormValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict'

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 *
 * As there are only two fields, the form is valid if they are
 */
export default function formValidation (state) {
  var next = state
  var _isValid = false
  var _isChanged = false
  if (state.form.fields.inn !== '' &&
      state.form.fields.surname !== '' &&
      state.form.fields.name !== '' &&
      state.form.fields.middlename !== '' &&
      state.form.fields.adress !== '' &&
      state.form.fields.okved !== '' &&
      state.form.fields.phone !== ''
    ) {
    _isValid = true
  }
    if (state.form.fields.inn !== state.form.originalProfile.inn ||
      state.form.fields.surname !== state.form.originalProfile.surname ||
      state.form.fields.name !== state.form.originalProfile.name ||
      state.form.fields.middlename !== state.form.originalProfile.middlename ||
      state.form.fields.adress !== state.form.originalProfile.adress ||
      state.form.fields.okved !== state.form.originalProfile.okved ||
      state.form.fields.phone !== state.form.originalProfile.phone
    ) {
      _isChanged = true
    }

  if (_isValid === true) {
    if (_isChanged === true) {
      return next.setIn(['form', 'isValid'], true)
          .setIn(['form', 'isChanged'], true)
    } else {
      return next.setIn(['form', 'isValid'], true)
          .setIn(['form', 'isChanged'], false)
    }
  } else {
    if (_isChanged === true) {
      return next.setIn(['form', 'isValid'], false)
          .setIn(['form', 'isChanged'], true)
    } else {
      return next.setIn(['form', 'isValid'], false)
          .setIn(['form', 'isChanged'], false)
    }
  }
}
