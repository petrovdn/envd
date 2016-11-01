
const {
  SET_PLATFORM,
  SET_VERSION,
  SET_THEME
} = require('../../lib/constants').default
import CONFIG from '../../lib/config'
var Theme = CONFIG.COLOR_SCHEME

export function setTheme (theme) {
  return {
    type: SET_THEME,
    payload: theme
  }
}

export function setPlatform (platform) {
  return {
    type: SET_PLATFORM,
    payload: platform
  }
}

export function setVersion (version) {
  return {
    type: SET_VERSION,
    payload: version
  }
}

export function setCurrendTheme (themeNumber) {
  let currentTheme = null
  switch (themeNumber) {
    case 1:
      currentTheme = Theme.SCHEME1
      break
    case 2:
      currentTheme = Theme.SCHEME2
      break
    case 3:
      currentTheme = Theme.SCHEME3
      break
    case 4:
      currentTheme = Theme.SCHEME4
      break
    case 5:
      currentTheme = Theme.SCHEME5
      break
  }

  return dispatch => {
    dispatch(setTheme(currentTheme))
  }
}
