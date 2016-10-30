
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as profileActions from '../reducers/profile/profileActions'

import MainProfile from '../components/UserProfile/MainProfile'

function mapStateToProps (state) {
  return {
    token: state.global.currentUser,
    userInfo: state.profile.userInfo,
    state: state.profile.state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(profileActions, dispatch)
  }
}

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(MainProfile)
export default UserProfile
