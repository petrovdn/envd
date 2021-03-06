/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
'use strict'
/**
 * ## Imports
 *
 * our 4 reducers
 */
import auth from './auth/authReducer'
import device from './device/deviceReducer'
import global from './global/globalReducer'
import profile from './profile/profileReducer'
import taskbox from './taskbox/taskboxReducer'
import envdbox from './envdbox/envdboxReducer'

import { combineReducers } from 'redux'
import { reducer as formProfileReducer } from 'redux-form'

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  auth,
  device,
  global,
  profile,
  taskbox,
  envdbox,
  form: formProfileReducer
})

export default rootReducer
