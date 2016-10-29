
//import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as profileActions from '../reducers/profile/profileActions'

//import EditProfile from '../components/UserProfile/EditProfile'
import Main from '../components/UserProfile/Main'
//import Main1 from '../components/UserProfile/Main1'
import MyScene from '../components/UserProfile/MyProfile'
//
// const {
//   EDITPROFILE,
//   MYPROFILE,
//   NOPROFILE
// } = require('../lib/constants').default

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

 // class UserProfileBox extends Component {
  // gotoRegister () { this.props.actions.registerState() }
  // gotoLogin () { this.props.actions.loginState() }
  // gotoFogot () { this.props.actions.forgotPasswordState() }
  // gotoLogout () { this.props.actions.logoutState() }
  //
  // onRegisterPress (username) {
  //   this.props.actions.signup(username)
  // }
  // onLoginPress (username, password) {
  //   this.props.actions.login(username, password)
  // }
  //
  // onFogotPress (username) {
  //   this.props.actions.resetPassword(username)
  // }
  //
  // onLogoutPress () {
  //   this.props.actions.logout()
  // }

  // render () {
  //   switch (this.props.auth.state) {
  //     case EDITPROFILE:
  //       return (
  //         <EditProfile
  //           onLoginPress={this.onLoginPress.bind(this)}
  //           gotoRegister={this.gotoRegister.bind(this)}
  //           gotoFogot={this.gotoFogot.bind(this)}
  //           username={this.props.username}
  //           password={this.props.password}
  //           error={this.props.auth.error}
  //          />
  //         )
      // case REGISTER:
      //   return (
      //     <RegisterRender
      //       onRegisterPress={this.onRegisterPress.bind(this)}
      //       gotoLogin={this.gotoLogin.bind(this)}
      //       gotoFogot={this.gotoFogot.bind(this)}
      //       username={this.props.username}
      //       error={this.props.auth.error}
      //      />
      //     )
      // case FORGOT_PASSWORD:
      //   return (
      //     <FogotPasswordRender
      //       onFogotPress={this.onFogotPress.bind(this)}
      //       gotoLogin={this.gotoLogin.bind(this)}
      //       gotoRegister={this.gotoRegister.bind(this)}
      //       username={this.props.username}
      //       error={this.props.auth.error}
      //      />
      //     )
      // case LOGOUT:
      //   return (
      //     <LogoutRender
      //       onLogoutPress={this.onLogoutPress.bind(this)}
      //       error={this.props.auth.error}
      //      />
      //     )
//     }
//   }
// }

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(Main)
export default UserProfile