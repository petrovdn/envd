/**
 * # taskboxActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict'

const {
  TASKLIST,
  TASKEDIT,
  TASKLIST_REQUEST,
  TASKLIST_SUCCESS,
  TASKLIST_FAILURE,
  ADDTASK_REQUEST,
  ADDTASK_SUCCESS,
  ADDTASK_FAILURE

} = require('../../lib/constants').default

const BackendFactory = require('../../lib/BackendFactory').default
import {appAuthToken} from '../../lib/AppAuthToken'

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in tasklist, taskedit
 */

export function tasklistState () {
  return {
    type: TASKLIST
  }
}
export function taskeditState () {
  return {
    type: TASKEDIT
  }
}

/**
 * ## tasklist actions
 */
export function getTasklistRequest () {
  return {
    type: TASKLIST_REQUEST
  }
}

export function getTasklistSuccess (tasklist) {
  return {
    type: TASKLIST_SUCCESS,
    payload: tasklist
  }
}
export function getTasklistFailure (error) {
  return {
    type: TASKLIST_FAILURE,
    payload: error
  }
}
/**
 * ## tasklist
 * hz
 */
export function getTasklist (sessionToken) {
  return dispatch => {
    dispatch(getTasklistRequest())
   // store or get a sessionToken
    return appAuthToken.getSessionToken(sessionToken)
     .then((token) => {
       return BackendFactory(token).getTasklist()
     })
     .then((json) => {
       dispatch(getTasklistSuccess(json))
     })
     .catch((error) => {
       dispatch(getTasklistFailure(error))
     })
  }
}

// export function getTasklist (sessionToken) {
//   var listViewData = [
//       [1097, 'Передать данные в Сов.налоговую', 'В работе', '08.09.2016'],
//       [7, '3-НДФЛ за 2015', 'В работе', '08.09.2016'],
//       [234, 'ЕНВД за 3 квартал 2016', 'Создана', '08.09.2016'],
//       [7, '3-НДФЛ за 2015', 'В работе', '08.09.2016'],
//       [1976, 'Подготовка сведений в ПФР', 'Новая', '08.09.2016'],
//       [234, 'ЕНВД за 3 квартал 2016', 'Создана', '08.09.2016'],
//       [4567, 'Передача файла в Нижегородскую налоговую', 'В работе', '08.09.2016'],
//       [1976, 'Подготовка сведений в ПФР', 'Новая', '08.09.2016']
//
//   ]
//   return dispatch => {
//     dispatch(getTasklistRequest())
//
//     setTimeout(() => {
//       dispatch(getTasklistSuccess(listViewData))
//     }, 1000)
//   }
// }

/**
 * ## addTask actions
 */
export function addTaskRequest () {
  return {
    type: ADDTASK_REQUEST
  }
}

export function addTaskSuccess () {
  return {
    type: ADDTASK_SUCCESS
  }
}
export function addTaskFailure (error) {
  return {
    type: ADDTASK_FAILURE,
    payload: error
  }
}
/**
 * ## addtask
 * hz
 */
export function addTask (sessionToken, title) {
  return dispatch => {
    dispatch(addTaskRequest())
   // store or get a sessionToken
    return appAuthToken.getSessionToken(sessionToken)
     .then((token) => {
       return BackendFactory(token).addTask(title)
     })
     .then((json) => {
       dispatch(addTaskSuccess(json))
     })
     .catch((error) => {
       dispatch(addTaskFailure(error))
     })
  }
}
