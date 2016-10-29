'use strict'

import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as profileActions from '../../reducers/profile/profileActions'

//import EditProfile from '../../components/UserProfile/EditProfile'
//import MyProfile from '../UserProfile/MyProfile'
//import NoProfile from 'NoProfile'

const {
  EDITPROFILE,
  MYPROFILE,
  NOPROFILE
} = require('../../lib/constants').default

class Main extends Component {
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

  render () {
    switch (this.props.state) {
      case EDITPROFILE:
        return (
          <EditProfile
           />
          )
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
    }
  }
}
