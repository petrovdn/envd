
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActions from '../reducers/auth/authActions'
import MainLogin from '../components/login/MainLogin'

function mapStateToProps (state) {
  return {
    auth: {
      state: state.auth.formIm.state,
      username: state.auth.formIm.fields.username,
      password: state.auth.formIm.fields.password,
      error: state.auth.formIm.error
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
