
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActions from '../reducers/auth/authActions'
import MainLogin from '../components/login/MainLogin'

function mapStateToProps (state) {
  return {
    auth: {
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

export default connect(mapStateToProps, mapDispatchToProps)(MainLogin)
