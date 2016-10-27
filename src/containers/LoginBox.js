
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
    auth: state.auth,
    global: state.global
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}



class LoginBox extends Component {
  gotoRegister () { this.props.actions.registerState }
  gotoLogin () { this.props.actions.loginState }
  gotoFogot () { this.props.actions.forgotPasswordState }
  gotoLogout () { this.props.actions.logoutState }

  registerPressHandler (singup, username) {
    singup(username)
  }
  loginPressHandler (login, username, password) {
    login(username, password)
  }
  fogotPressHandler (resetPassword, username) {
    resetPassword(username)
  }

  render () {
    let onLoginPress = this.loginPressHandler.bind(null,
                                              this.props.actions.login,
                                              this.props.auth.form.fields.username,
                                              this.props.auth.form.fields.password
                                             )
    return (
      <LoginRender
        onLoginPress={onLoginPress.bind(this)}
        gotoRegister={this.gotoRegister.bind(this)}
        gotoFogot={this.gotoFogot.bind(this)}
        auth={this.props.auth}
        global={this.props.global}
       />
      )

    switch (this.props.auth.form.state) {
      case LOGIN:
        let onLoginPress = loginPressHandler.bind(null,
                                                  this.props.actions.login,
                                                  this.props.auth.form.fields.username,
                                                  this.props.auth.form.fields.password
                                                 )
        return (
          <LoginRender
            onLoginPress={onLoginPress.bind(this)}
            gotoRegister={gotoRegister.bind(this)}
            gotoFogot={gotoFogot.bind(this)}
            auth={this.props.auth}
            global={this.props.global}
           />
          )
    case REGISTER:

    case FORGOT_PASSWORD:
    case LOGOUT:

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox)
