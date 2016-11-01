
'use strict'

const InitialState = require('./authInitialState').default

const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

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

  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE

} = require('../../lib/constants').default

const initialState = new InitialState()

export default function authReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)
  switch (action.type) {

    // при отправке запроса форма очищается от любых ошибок
    // isFetcing устанавливается в true (для отображения индикаторов загрузки)
    // username and password сохраним на всякий, как это было ранее, пригодится
    case LOGIN_REQUEST:
      return state.setIn(['formIm', 'fields', 'password'], action.payload.password)
                            .setIn(['formIm', 'fields', 'username'], action.payload.username)
                            .setIn(['formIm', 'isFetching'], true)
                            .setIn(['formIm', 'error'], null)

    case SIGNUP_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return state.setIn(['formIm', 'fields', 'username'], action.payload.username)
                          .setIn(['formIm', 'isFetching'], true)
                          .setIn(['formIm', 'error'], null)

    case LOGOUT_REQUEST:
    case SESSION_TOKEN_REQUEST:
      return state.setIn(['formIm', 'isFetching'], true)
      .setIn(['formIm', 'error'], null)

    // управление навигцией внутри блоков (боксов). state задает вид отображаемой сцены
    // (навигация между блоками производится прямым переключением сцен react-native-router-flux
    case LOGOUT:
    case LOGIN:
    case REGISTER:
    case FORGOT_PASSWORD:
      return state.setIn(['formIm', 'state'], action.type)
        .setIn(['formIm', 'error'], null)

    // просто сбрасываем признак выполнения запроса
    case SESSION_TOKEN_SUCCESS:
    case SESSION_TOKEN_FAILURE:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return state.setIn(['formIm', 'isFetching'], false)

    // запрос выполнен успешно, устанавливаем поля, переходим к экрану логин
    case SIGNUP_SUCCESS:
      return state.setIn(['formIm', 'state'], 'LOGIN')
        .setIn(['formIm', 'error'], null)
        .setIn(['formIm', 'fields', 'password'], action.payload.password)
        .setIn(['formIm', 'isFetching'], false)

    // запрос выполнен, но неуспешно, устанавливаем признак ошибки для отображения в форме
    case SIGNUP_FAILURE:
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return state.setIn(['formIm', 'isFetching'], false)
      .setIn(['formIm', 'error'], action.payload)

  }
  /**
   * ## Default
   */
  return state
}
