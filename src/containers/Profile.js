'use strict'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as profileActions from '../reducers/profile/profileActions'
import * as globalActions from '../reducers/global/globalActions'

import ErrorAlert from '../components/ErrorAlert'
import FormButton from '../components/FormButton'
import Header from '../components/Header'

import React, {Component} from 'react'
import
{
  StyleSheet,
  View
}
from 'react-native'

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  }
})

import t from 'tcomb-form-native'
let Form = t.form.Form

function mapStateToProps (state) {
  return {
    profile: state.profile,
    global: {
      currentUser: state.global.currentUser,
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...profileActions, ...globalActions }, dispatch)
  }
}
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

class Profile extends Component {
  constructor (props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      value: {
        inn: '',
        surname: '',
        name: '',
        middlename: '',
        adress: '',
        okved: '',
        phone: ''
      }
    }
  }
  /**
   * ### onChange
   *
   * When any fields change in the form, fire this action so they can
   * be validated.
   *
   */
  onChange (value) {
    if (value.inn !== '') {
      this.props.actions.onProfileFormFieldChange('inn', value.inn)
    }
    if (value.surname !== '') {
      this.props.actions.onProfileFormFieldChange('surname', value.surname)
    }
    if (value.name !== '') {
      this.props.actions.onProfileFormFieldChange('name', value.name)
    }
    if (value.middlename !== '') {
      this.props.actions.onProfileFormFieldChange('middlename', value.middlename)
    }
    if (value.adress !== '') {
      this.props.actions.onProfileFormFieldChange('adress', value.adress)
    }
    if (value.okved !== '') {
      this.props.actions.onProfileFormFieldChange('okved', value.okved)
    }
    if (value.phone !== '') {
      this.props.actions.onProfileFormFieldChange('phone', value.phone)
    }
    this.setState({value})
  }
  /**
   * ### componentWillReceiveProps
   *
   * Since the Forms are looking at the state for the values of the
   * fields, when we we need to set them
   */
  componentWillReceiveProps (props) {
    this.setState({
      formValues: {
        inn: props.profile.form.fields.inn,
        surname: props.profile.form.fields.surname,
        name: props.profile.form.fields.name,
        middlename: props.profile.form.fields.middlename,
        adress: props.profile.form.fields.adress,
        okved: props.profile.form.fields.okved,
        phone: props.profile.form.fields.phone
      }
    })
  }

  /**
   * ### render
   * display the form wrapped with the header and button
   */
  render () {
    this.errorAlert.checkError(this.props.profile.form.error)

    let self = this

    let ProfileForm = t.struct({
      inn: t.String,
      surname: t.String,
      name: t.String,
      middlename: t.String,
      adress: t.String,
      okved: t.String,
      phone: t.String
    })
    /**
     * Set up the field definitions.  If we're fetching, the fields
     * are disabled.
     */
    let options = {
      auto: 'placeholders',
      stylesheet: formStylesheet,
      fields: {
        inn: {
          label: I18n.t('Profile.inn'),
          placeholder: I18n.t('Profile.inn'),
          maxLength: 12,
          editable: !this.props.profile.form.isFetching
        },
        surname: {
          label: I18n.t('Profile.surname'),
          placeholder: I18n.t('Profile.surname'),
          editable: !this.props.profile.form.isFetching
        },
        name: {
          label: I18n.t('Profile.name'),
          placeholder: I18n.t('Profile.name'),
          editable: !this.props.profile.form.isFetching
        },
        middlename: {
          label: I18n.t('Profile.middlename'),
          placeholder: I18n.t('Profile.middlename'),
          editable: !this.props.profile.form.isFetching
        },
        adress: {
          label: I18n.t('Profile.adress'),
          placeholder: I18n.t('Profile.adress'),
          editable: !this.props.profile.form.isFetching
        },
        okved: {
          label: I18n.t('Profile.okved'),
          placeholder: I18n.t('Profile.okved'),
          editable: !this.props.profile.form.isFetching
        },
        phone: {
          label: I18n.t('Profile.phone'),
          placeholder: I18n.t('Profile.phone'),
          editable: !this.props.profile.form.isFetching
        }
      }
    }

    /**
     * When the button is pressed, send the users info including the
     * ```currrentUser``` object as it contains the sessionToken and
     * user objectId
     */
    let profileButtonText = I18n.t('Profile.update')
    let onButtonPress = () => {
      this.props.actions.updateProfile(
        this.props.global.currentUser,
        this.props.profile.form.fields.inn,
        this.props.profile.form.fields.surname,
        this.props.profile.form.fields.name,
        this.props.profile.form.fields.middlename,
        this.props.profile.form.fields.adress,
        this.props.profile.form.fields.okved,
        this.props.profile.form.fields.phone)
    }
    /**
     * Wrap the form with the header and button.  The header props are
     * mostly for support of Hot reloading. See the docs for Header
     * for more info.
     */
    let verfiedText = I18n.t('Profile.verified') +
                       ' (' +
                       I18n.t('Profile.display') +
                       ')'
    return (
      <View style={styles.container}>
        <Header isFetching={this.props.profile.form.isFetching}
          showState={this.props.global.showState}
          currentState={this.props.global.currentState}
          onGetState={this.props.actions.getState}
          onSetState={this.props.actions.setState}
        />
        <View style={styles.inputs}>
          <Form
            ref='form'
            type={ProfileForm}
            options={options}
            value={this.state.value}
            onChange={this.onChange.bind(self)}
          />
        </View>

        <FormButton
          isDisabled={!this.props.profile.form.isChanged || this.props.profile.form.isFetching}
          onPress={onButtonPress.bind(self)}
          buttonText={profileButtonText} />

      </View>
    )
  }
}

var LABEL_COLOR = '#000000'
var INPUT_COLOR = '#000000'
var ERROR_COLOR = '#a94442'
var HELP_COLOR = '#999999'
var BORDER_COLOR = '#cccccc'
var DISABLED_COLOR = '#777777'
var DISABLED_BACKGROUND_COLOR = '#eeeeee'
var FONT_SIZE = 20
var FONT_WEIGHT = '500'
var formStylesheet = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 5
    },
    error: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: 14,
      marginBottom: 3,
      fontWeight: FONT_WEIGHT
    },
    // the style applied when a validation error occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 3,
      fontWeight: FONT_WEIGHT
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontSize: FONT_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR
  },
  textbox: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 1
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      marginBottom: 5
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  checkbox: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  select: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  pickerTouchable: {
    normal: {
      height: 44,
      flexDirection: 'row',
      alignItems: 'center'
    },
    error: {
      height: 44,
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  pickerValue: {
    normal: {
      fontSize: FONT_SIZE,
      paddingLeft: 7
    },
    error: {
      fontSize: FONT_SIZE,
      paddingLeft: 7
    }
  },
  datepicker: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  dateTouchable: {
    normal: {},
    error: {}
  },
  dateValue: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5
    },
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5
    }
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
