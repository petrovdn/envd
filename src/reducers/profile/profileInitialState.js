
'use strict'

const {Record} = require('immutable')
const {
 MYPROFILE
} = require('../../lib/constants').default

var InitialState = Record({
  state: MYPROFILE,
  userInfo: {
    fullname: ''
  },
  isFetching: null
})
export default InitialState
