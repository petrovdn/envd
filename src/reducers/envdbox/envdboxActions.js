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

// временные константы для заполнения первичных данных для сервера
ADD_ENVDLISTS_REQUEST,
ADD_ENVDLISTS_SUCCESS,
ADD_ENVDLISTS_FAILURE,

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

const BackendFactory = require('../../lib/BackendFactory').default
import {appAuthToken} from '../../lib/AppAuthToken'
import {Actions} from 'react-native-router-flux'

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in envdlist, envdedit
 */

export function envdlistState () {
  return {
    type: ENVDLIST
  }
}

export function step1State () {
  return {
    type: STEP1
  }
}

export function addStep1Data (data) {
  return {
    type: ADD_STEP1_DATA,
    payload: data
  }
}

export function step2State () {
  return {
    type: STEP2
  }
}

export function addStep2Data (data) {
  return {
    type: ADD_STEP2_DATA,
    payload: data
  }
}

export function step3State () {
  return {
    type: STEP3
  }
}

export function addStep3Data (activityType, taxBase) {
  return {
    type: ADD_STEP3_DATA,
    payload: {
      activityType, taxBase
    }
  }
}

export function step4State () {
  return {
    type: STEP4
  }
}

export function addStep4Data (data) {
  return {
    type: ADD_STEP4_DATA,
    payload: data
  }
}

export function step5State () {
  return {
    type: STEP5
  }
}

export function addStep5Data (data, tax) {
  return {
    type: ADD_STEP5_DATA,
    payload: {
      data,
      tax
    }
  }
}

export function step6State () {
  return {
    type: STEP6
  }
}

export function addStep6Data (data) {
  return {
    type: ADD_STEP6_DATA,
    payload: data
  }
}

export function step7State () {
  return {
    type: STEP7
  }
}

export function step8State () {
  return {
    type: STEP8
  }
}

/**
 * ## envdlist actions
 */
export function getEnvdListRequest () {
  return {
    type: ENVDLIST_REQUEST
  }
}

export function getEnvdListSuccess (envdlist) {
  return {
    type: ENVDLIST_SUCCESS,
    payload: envdlist
  }
}
export function getEnvdListFailure (error) {
  return {
    type: ENVDLIST_FAILURE,
    payload: error
  }
}
/**
 * ## envdlist
 * hz
 */
export function getEnvdList (sessionToken) {
  return dispatch => {
    dispatch(getEnvdListRequest())
   // store or get a sessionToken
    return appAuthToken.getSessionToken(sessionToken)
     .then((token) => {
       return BackendFactory(token).getEnvdList()
     })
     .then((json) => {
       dispatch(getEnvdListSuccess(json))
     })
     .catch((error) => {
       dispatch(getEnvdListFailure(error))
     })
  }
}

// export function getEnvdList (sessionToken) {
//   // id, year, quarter, activityType: {
//   // 1: ожидается оформление
//   // 2: Нужно готовить
//   // 3: Просрочено
//   // 4: Завершено
//   // }
//   var listViewData = [
//       [1, 2016, 1, 4],
//       [2, 2016, 2, 3],
//       [3, 2016, 3, 2],
//       [4, 2016, 4, 1]
//   ]
//   return dispatch => {
//     dispatch(getEnvdListRequest())
//
//     setTimeout(() => {
//       dispatch(getEnvdListSuccess(listViewData))
//     }, 1000)
//   }
// }

/**
 * ## getenvd actions
 * запрашиваются детали процесса - все поля, которые есть на сервере
 */
export function getEnvdRequest () {
  return {
    type: GETENVD_REQUEST
  }
}

export function getEnvdSuccess (envd) {
  return {
    type: GETENVD_SUCCESS,
    payload: envd
  }
}
export function getEnvdFailure (error) {
  return {
    type: GETENVD_FAILURE,
    payload: error
  }
}

export function getEnvd (id, sessionToken) {
  console.log(id, sessionToken)
  return dispatch => {
    dispatch(getEnvdRequest())
   // store or get a sessionToken
    return appAuthToken.getSessionToken(sessionToken)
     .then((token) => {
       return BackendFactory(token).getEnvd(id)
     })
     .then((json) => {
       dispatch(getEnvdSuccess(json))
       dispatch(step1State())
     })
     .catch((error) => {
       dispatch(getEnvdFailure(error))
     })
  }
}
/**
 * ## Activitylist actions
 */
export function getActivitylistRequest () {
  return {
    type: ACTIVITY_LIST_REQUEST
  }
}

export function getActivitylistSuccess (Activitylist) {
  return {
    type: ACTIVITY_LIST_SUCCESS,
    payload: Activitylist
  }
}
export function getActivitylistFailure (error) {
  return {
    type: ACTIVITY_LIST_FAILURE,
    payload: error
  }
}
/**
 * ## activitylist
 * hz
 */
// export function getActivitylist(sessionToken) {
//   return dispatch => {
//     dispatch(getActivitylistRequest())
//    // store or get a sessionToken
//     return appAuthToken.getSessionToken(sessionToken)
//      .then((token) => {
//        return BackendFactory(token).getActivitylist()
//      })
//      .then((json) => {
//        dispatch(getActivitylistSuccess(json))
//      })
//      .catch((error) => {
//        dispatch(getActivitylistFailure(error))
//      })
//   }
// }

export function getActivitylist (sessionToken) {
  var listViewData = [
      [1, '01', 7500, 'Бытовые услуги', 'Оказание бытовых услуг'],
      [2, '02', 7500, 'Ветеринарные услуги', 'Оказание ветеринарных услуг'],
      [3, '03', 12000, 'Услуги для автовладельцев', 'Оказание услуг по ремонту, техническому обслуживанию и мойке автомототранспортных средств'],
      [4, '04', 50, 'Стоянка и хранение автотранспорта', 'Оказание услуг по предоставлению во временное владение (в пользование) мест для стоянки автомототранспортных средств, а также по хранению автомототранспортных средств на платных стоянках'],
      [5, '05', 6000, 'Перевозка грузов на автотранспорте', 'Оказание автотранспортных услуг по перевозке грузов'],
      [6, '06', 1500, 'Перевозка пассажиров на автотранспорте', 'Оказание автотранспортных услуг по перевозке пассажиров'],
      [7, '07', 1800, 'Розничная торговля в торговых залах', 'Розничная торговля, осуществляемая через объекты стационарной торговой сети, имеющие торговые залы'],
      [8, '08', 9000, 'Нестационарная торговля на площади до 5м2', 'Розничная торговля, осуществляемая через объекты стационарной торговой сети, не имеющие торговых залов, а также через объекты нестационарной торговой сети, площадь торгового места в которых не превышает 5 квадратных метров'],
      [9, '09', 1800, 'Нестационарная торговля на площади свыше 5м2', 'Розничная торговля, осуществляемая через объекты стационарной торговой сети, не имеющие торговых залов, а также через объекты нестационарной торговой сети, площадь торгового места в которых превышает 5 квадратных метров'],
      [10, '10', 4500, 'Развозная и разносная розничная торговля', 'Развозная и разносная розничная торговля'],
      [11, '11', 4500, 'Продажа через торговые автоматы', 'Реализация товаров с использованием торговых автоматов'],
      [12, '12', 1000, 'Общепит с залом для обслуживания', 'Оказание услуг общественного питания через объект организации общественного питания, имеющий зал обслуживания посетителей'],
      [13, '13', 4500, 'Общепит без зала обслуживания', 'Оказание услуг общественного питания через объект организации общественного питания, не имеющий зала обслуживания посетителей'],
      [14, '14', 3000, 'Наружная реклама', 'Распространение наружной рекламы с использованием рекламных конструкций (за исключением рекламных конструкций с автоматической сменой изображения и электронных табло)'],
      [15, '15', 4000, 'Наружная реклама с авто сменой изображения', 'Распространение наружной рекламы с использованием рекламных конструкций с автоматической сменой изображения'],
      [16, '16', 5000, 'Наружная реклама на электронных табло', 'Распространение наружной рекламы с использованием электронных табло'],
      [17, '17', 10000, 'Наружная реклама на транспорте', 'Размещение рекламы с использованием внешних и внутренних поверхностей транспортных средств'],
      [18, '18', 1000, 'Аренда жилых помещений', 'Оказание услуг по временному размещению и проживанию'],
      [19, '19', 6000, 'Аренда коммерческой недвижимости до 5 м2', 'временное владение и (или) в пользование торговых мест, расположенных в объектах стационарной торговой сети, не имеющих торговых залов, объектов нестационарной торговой сети, а также объектов организации общественного питания, не имеющих залов обслуживания посетителей, если площадь каждого из них не превышает 5 квадратных метров'],
      [20, '20', 1200, 'Аренда коммерческой недвижимости свыше 5 м2', 'Оказание услуг по передаче во временное владение и (или) в пользование торговых мест, расположенных в объектах стационарной торговой сети, не имеющих торговых залов, объектов нестационарной торговой сети, а также объектов организации общественного питания, не имеющих залов обслуживания посетителей, если площадь каждого из них превышает 5 квадратных метров'],
      [21, '21', 10000, 'Аренда коммерческой недвижимости до 10 м2', 'Оказание услуг по передаче во временное владение и (или) в пользование земельных участков для размещения объектов стационарной и нестационарной торговой сети, а также объектов организации общественного питания, если площадь земельного участка не превышает 10 квадратных метров'],
      [22, '22', 1000, 'Аренда коммерческой недвижимости свыше 10 м2', 'Оказание услуг по передаче во временное владение и (или) в пользование земельных участков для размещения объектов стационарной и нестационарной торговой сети, а также объектов организации общественного питания, если площадь земельного участка превышает 10 квадратных метров']
  ]
  return dispatch => {
    dispatch(getActivitylistRequest())
    setTimeout(() => {
      dispatch(getActivitylistSuccess(listViewData))
    }, 1000)
  }
}


export function initializeServer (sessionToken) {
  return dispatch => {
   // store or get a sessionToken
    return appAuthToken.getSessionToken(sessionToken)
    .then((token) => {
      return BackendFactory(token).editENVD(1)
    })
    //  .then((token) => {
    //    return BackendFactory(token).addEvndStart()
    //  })
     .catch((error) => {
       console.log(error)
     })
  }
}

export function deleteEnvd (sessionToken) {
  return dispatch => {
    return appAuthToken.getSessionToken(sessionToken)
     .then((token) => {
       return BackendFactory(token).deleteEvndStart()
     })
  }
}
