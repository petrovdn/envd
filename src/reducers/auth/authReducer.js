
'use strict'

const InitialState = require('./authInitialState').default
const fieldValidation = require('../../lib/fieldValidation').default
const formValidation = require('./authFormValidation').default

const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  SET_STATE
} = require('../../lib/constants').default

const initialState = new InitialState()

export default function authReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case LOGIN_REQUEST:
      let nextState = state.setIn(['formIm', 'fields', 'password'], action.payload.password)
                            .setIn(['formIm', 'fields', 'username'], action.payload.username)
                            .setIn(['formIm', 'isFetching'], true)
                            .setIn(['formIm', 'error'], null)
      return nextState

    case SIGNUP_REQUEST:
    case RESET_PASSWORD_REQUEST:
      nextState = state.setIn(['formIm', 'fields', 'username'], action.payload.username)
                          .setIn(['formIm', 'isFetching'], true)
                          .setIn(['formIm', 'error'], null)
      return nextState
    case LOGOUT_REQUEST:
    case SESSION_TOKEN_REQUEST:
      nextState = state.setIn(['formIm', 'isFetching'], true)
      .setIn(['formIm', 'error'], null)
      return nextState

    /**
     * ### Logout state
     * The logged in user logs out
     * Clear the form's error and all the fields
     */
    case LOGOUT:
      return formValidation(
      state.setIn(['formIm', 'state'], action.type)
        .setIn(['formIm', 'error'], null)
    )

    /**
     * ### Loggin in state
     * The user isn't logged in, and needs to
     * login, register or reset password
     *
     * Set the form state and clear any errors
     */
    case LOGIN:
    case REGISTER:
    case FORGOT_PASSWORD:
      return formValidation(
      state.setIn(['formIm', 'state'], action.type)
        .setIn(['formIm', 'error'], null)
    )

    /**
     * ### Auth form field change
     *
     * Set the form's field with the value
     * Clear the forms error
     * Pass the fieldValidation results to the
     * the formValidation
     */
    case ON_AUTH_FORM_FIELD_CHANGE: {
      const {field, value} = action.payload
      let nextState = state.setIn(['formIm', 'fields', field], value)
          .setIn(['formIm', 'error'], null)

      return formValidation(
      fieldValidation(nextState, action)
      , action)
    }
    /**
     * ### Requests end, good or bad
     * Set the fetching flag so the forms will be enabled
     */
    case SESSION_TOKEN_SUCCESS:
    case SESSION_TOKEN_FAILURE:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return state.setIn(['formIm', 'isFetching'], false)
    /**
     * ### Request good
     * Set the fetching flag so the forms will be enabled
     * user needs to login
     */

    case SIGNUP_SUCCESS:
      return formValidation(
      state.setIn(['formIm', 'state'], 'LOGIN')
        .setIn(['formIm', 'error'], null)
        .setIn(['formIm', 'fields', 'password'], action.payload.password)
        .setIn(['formIm', 'isFetching'], false)
      )

    /**
     *
     * The fetching is done, but save the error
     * for display to the user
     */
    case SIGNUP_FAILURE:
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return state.setIn(['formIm', 'isFetching'], false)
      .setIn(['formIm', 'error'], action.payload)

    /**
     * ### Hot Loading support
     *
     * Set all the field values from the payload
     */
    case SET_STATE:
      var formIm = JSON.parse(action.payload).auth.formIm

      var next = state.setIn(['formIm', 'state'], formIm.state)
          .setIn(['formIm', 'disabled'], formIm.disabled)
          .setIn(['formIm', 'error'], formIm.error)
          .setIn(['formIm', 'isValid'], formIm.isValid)
          .setIn(['formIm', 'isFetching'], formIm.isFetching)

      return next

    case DELETE_TOKEN_REQUEST:
    case DELETE_TOKEN_SUCCESS:
        /**
         * no state change, just an ability to track action requests...
         */
      return state

  }
  /**
   * ## Default
   */
  return state
}
