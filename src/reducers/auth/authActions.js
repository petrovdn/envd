
'use strict'

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
  RESET_PASSWORD_FAILURE

} = require('../../lib/constants').default


const BackendFactory = require('../../lib/BackendFactory').default

import {Actions} from 'react-native-router-flux'

import {appAuthToken} from '../../lib/AppAuthToken'

const _ = require('underscore')

// actions для переключения между окнами блока регистрации (текущее состояние).

export function logoutState () {
  return {
    type: LOGOUT
  }
}
export function registerState () {
  return {
    type: REGISTER
  }
}

export function loginState () {
  return {
    type: LOGIN
  }
}

export function forgotPasswordState () {
  return {
    type: FORGOT_PASSWORD
  }
}

/**
 * ## Logout actions
 */
export function logoutRequest () {
  return {
    type: LOGOUT_REQUEST
  }
}

export function logoutSuccess () {
  return {
    type: LOGOUT_SUCCESS
  }
}
export function logoutFailure (error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error
  }
}

/**
 * ## Login
 * After dispatching the logoutRequest, get the sessionToken
 *
 *
 * When the response is received and it's valid
 * change the state to register and finish the logout
 *
 * But if the call fails, like expired token or
 * no network connection, just send the failure
 *
 * And if you fail due to an invalid sessionToken, be sure
 * to delete it so the user can log in.
 *
 * How could there be an invalid sessionToken?  Maybe they
 * haven't used the app for a long time.  Or they used another
 * device and logged out there.
 */
export function logout () {
  return dispatch => {
    dispatch(logoutRequest())
    return appAuthToken.getSessionToken()

      .then((token) => {
        dispatch(deleteSessionToken())
        dispatch(logoutSuccess())
        dispatch(loginState())
        Actions.Drawer()
      })
      .catch((error) => {
        dispatch(logoutFailure(error))
        dispatch(loginState())
        Actions.LoginBox()
      })
  }
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange (field, value) {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}
/**
 * ## Signup actions
 */
export function signupRequest (username) {
  return {
    type: SIGNUP_REQUEST,
    payload: username
  }
}
export function signupSuccess (json) {
  return {
    type: SIGNUP_SUCCESS,
    payload: json
  }
}
export function signupFailure (error) {
  return {
    type: SIGNUP_FAILURE,
    payload: error
  }
}
/**
 * ## SessionToken actions
 */
export function sessionTokenRequest () {
  return {
    type: SESSION_TOKEN_REQUEST
  }
}
export function sessionTokenRequestSuccess (token) {
  return {
    type: SESSION_TOKEN_SUCCESS,
    payload: token
  }
}
export function sessionTokenRequestFailure (error) {
  return {
    type: SESSION_TOKEN_FAILURE,
    payload: _.isUndefined(error) ? null : error
  }
}

/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest () {
  return {
    type: DELETE_TOKEN_REQUEST
  }
}
export function deleteTokenRequestSuccess () {
  return {
    type: DELETE_TOKEN_SUCCESS
  }
}

/**
 * ## Delete session token
 *
 * Call the AppAuthToken deleteSessionToken
 */
export function deleteSessionToken () {
  return dispatch => {
    dispatch(deleteTokenRequest())
    return appAuthToken.deleteSessionToken()
      .then(() => {
        dispatch(deleteTokenRequestSuccess())
      })
  }
}
/**
 * ## Token
 * If AppAuthToken has the sessionToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export function getSessionToken () {
  return dispatch => {
    dispatch(sessionTokenRequest())
    return appAuthToken.getSessionToken()

      .then((token) => {
        console.log(token)
        if (token) {
          dispatch(logoutState())
          Actions.drawer()
        } else {
          dispatch(loginState())
          Actions.LoginBox()
        }
      })

      .catch((error) => {
        console.error(error)
        dispatch(sessionTokenRequestFailure(error))
        dispatch(loginState())
        Actions.LoginBox()
      })
  }
}

/**
 * ## saveSessionToken
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} json - object with sessionToken
 */
export function saveSessionToken (json) {
  return appAuthToken.storeSessionToken(json)
}
/**
 * ## signup
 * @param {string} username - name of user
 *
 * Call the server signup and if good, save the sessionToken,
 * set the state to logout and signal success
 *
 * Otherwise, dispatch the error so the user can see
 */
export function signup (username) {
  return dispatch => {
    dispatch(signupRequest(username))
    return BackendFactory().signup({
      login: username
    })
      .then((json) => {
        dispatch(signupSuccess(json))
        Actions.Login()
      })
      .catch((error) => {
        dispatch(signupFailure(error.message))
      })
  }
}

/**
 * ## Login actions
 */
export function loginRequest (username, password) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      username,
      password
    }
  }
}

export function loginSuccess (json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json
  }
}

export function loginFailure (error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}
/**
 * ## Login
 * @param {string} username - user's name
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the sessionToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */

export function login (username = '', password = '') {
  return dispatch => {
    dispatch(loginRequest(username, password))
    return BackendFactory().login({
      login: username,
      password: password
    })

      .then(function (json) {
        return saveSessionToken(json.token)
          .then(function () {
            dispatch(loginSuccess(json.token))
            // navigate to Tabbar
            Actions.drawer()
            dispatch(logoutState())
          })
      })
      .catch((error) => {
        dispatch(loginFailure(error.status))
      })
  }
}

// /**
//  * ## ResetPassword actions
//  */
// export function resetPasswordRequest () {
//   return {
//     type: RESET_PASSWORD_REQUEST,
//     payload: username
//   }
// }
//
// export function resetPasswordSuccess () {
//   return {
//     type: RESET_PASSWORD_SUCCESS
//   }
// }
//
// export function resetPasswordFailure (error) {
//   return {
//     type: RESET_PASSWORD_FAILURE,
//     payload: error
//   }
// }
/**
 * ## ResetPassword
 *
 * @param {string} email - the email address to reset password
 * *Note* There's no feedback to the user whether the email
 * address is valid or not.
 *
 * This functionality depends on the server set
 * up correctly ie, that emails are verified.
 * With that enabled, an email can be sent w/ a
 * form for setting the new password.
 */
// export function resetPassword (username) {
//   return dispatch => {
//     dispatch(resetPasswordRequest(username))
//     return BackendFactory().resetPassword({
//       username: username
//     })
//       .then(() => {
//         dispatch(loginState())
//         dispatch(resetPasswordSuccess())
//         Actions.Login()
//       })
//       .catch((error) => {
//         dispatch(resetPasswordFailure(error))
//       })
//   }
// }
