
'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActions from '../reducers/auth/authActions'

/**
 *   LoginRender
 */
import LoginRender from '../components/login/LoginRender'
//import RegisterRender from '../components/login/RegisterRender'
//import LogoutRender from '../components/login/LogoutRender'
//import ForgotPasswordRender from '../components/login/ForgotPasswordRender'

import React, {Component} from 'react'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  LOGOUT
} = require('../lib/constants').default

function mapStateToProps (state) {
  return {
    auth: {
      state: state.auth.form.state,
      username: state.auth.form.fields.username,
      password: state.auth.form.fields.password
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

  registerPressHandler (singup, username) {
    singup(username)
  }
  onLoginPress (username, password) {
    this.props.actions.login(username, password)
  }

  fogotPressHandler (resetPassword, username) {
    resetPassword(username)
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
           />
          )
    case REGISTER:

    case FORGOT_PASSWORD:
    case LOGOUT:

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox)
