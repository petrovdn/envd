'use strict'

import React, {Component} from 'react'

import LoginRender from './LoginRender'
import RegisterRender from './RegisterRender'
import LogoutRender from './LogoutRender'
import FogotPasswordRender from './FogotPasswordRender'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  LOGOUT
} = require('../../lib/constants').default

export default class Main extends Component {
  gotoRegister () { this.props.actions.registerState() }
  gotoLogin () { this.props.actions.loginState() }
  gotoFogot () { this.props.actions.forgotPasswordState() }
  gotoLogout () { this.props.actions.logoutState() }

  onRegisterPress (username) {
    this.props.actions.signup(username)
  }
  onLoginPress (username, password) {
    this.props.actions.login(username, password)
  }

  onFogotPress (username) {
    this.props.actions.resetPassword(username)
  }

  onLogoutPress () {
    this.props.actions.logout()
  }

  render () {
    switch (this.props.auth.state) {
      case LOGIN:
        return (
          <LoginRender
            onLoginPress={this.onLoginPress.bind(this)}
            gotoRegister={this.gotoRegister.bind(this)}
            gotoFogot={this.gotoFogot.bind(this)}
            username={this.props.username}
            password={this.props.password}
            error={this.props.auth.error}
           />
          )
      case REGISTER:
        return (
          <RegisterRender
            onRegisterPress={this.onRegisterPress.bind(this)}
            gotoLogin={this.gotoLogin.bind(this)}
            gotoFogot={this.gotoFogot.bind(this)}
            username={this.props.username}
            error={this.props.auth.error}
           />
          )
      case FORGOT_PASSWORD:
        return (
          <FogotPasswordRender
            onFogotPress={this.onFogotPress.bind(this)}
            gotoLogin={this.gotoLogin.bind(this)}
            gotoRegister={this.gotoRegister.bind(this)}
            username={this.props.username}
            error={this.props.auth.error}
           />
          )
      case LOGOUT:
        return (
          <LogoutRender
            onLogoutPress={this.onLogoutPress.bind(this)}
            error={this.props.auth.error}
           />
          )
    }
  }
}
