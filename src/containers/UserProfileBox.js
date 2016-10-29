'use strict'

import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActions from '../reducers/auth/authActions'

import EditProfile from '../components/login/LoginRender'
import MyProfile from '../components/login/RegisterRender'
import NoProfile from '../components/login/LogoutRender'

const {
  EDITPROFILE,
  MYPROFILE,
  NOPROFILE
} = require('../lib/constants').default

function mapStateToProps (state) {
  return {
    : {
      state: state.auth.form.state,
      username: state.auth.form.fields.username,
      password: state.auth.form.fields.password,
      error: state.auth.form.error
    },
    global: state.global
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

class LoginBox extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox)
