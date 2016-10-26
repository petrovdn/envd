import React, { Component, propTypes} from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

var I18n = require('react-native-i18n')
import Translations from '../../lib/Translations'
I18n.translations = Translations

const t = require('tcomb-form-native')
let Form = t.form.Form

const Button = require('apsl-react-native-button')

export default class extends Component {
  handlePressEdit () {

  }
  handlePressSave () {
    //this.props.actions.getTasklist(this.props.global.currentUser)
  }
  handlePressSend () {
    //this.props.actions.getTasklist(this.props.global.currentUser)
  }


  render () {
    let options = {
      fields: {
      }
    }

    let repTitle = {
      label: I18n.t('envdedit.repTitle'),
      maxLength: 200,
      editable: true
    }

    let envdeditForm = t.struct({
      repTitle: t.String
    })
    options.fields['repTitle'] = repTitle
    options.fields['repTitle'].placeholder = I18n.t('envdedit.repTitlePlaceHolder')
    options.fields['repTitle'].autoCapitalize = 'none'

    return (
      <View style={styles.container}>

        <Form ref='envdeditForm'
          type={envdeditForm}
          options={options}
      />
      <Button style={styles.button} onPress={this.handlePressSend.bind(this)}>
        {I18n.t('envdedit.sendButton')}
      </Button>
      <Button style={styles.button} onPress={this.handlePressSave.bind(this)}>
        {I18n.t('envdedit.saveButton')}
      </Button>
      <Button style={styles.button} onPress={() => this.props.onCancel()}>
        {I18n.t('envdedit.cancelButton')}
      </Button>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 8,
    justifyContent: 'center'
  }
})
