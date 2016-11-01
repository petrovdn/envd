
import InitialState from './deviceInitialState'

const {
  SET_PLATFORM,
  SET_VERSION,
  SET_THEME
} = require('../../lib/constants').default

const initialState = new InitialState()

export default function deviceReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {

    case SET_PLATFORM:
      const platform = action.payload
      return state.set('platform', platform)

    case SET_VERSION:
      const version = action.payload
      return state.set('version', version)

    case SET_THEME:
      return state.set('theme', action.payload)
  }

  return state
}
