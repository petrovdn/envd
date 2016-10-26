import React, { Component} from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
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

    let taskTitle = {
      label: I18n.t('taskedit.taskTitle'),
      maxLength: 200,
      editable: true
    }

    let taskeditForm = t.struct({
      taskTitle: t.String
    })
    options.fields['taskTitle'] = taskTitle
    options.fields['taskTitle'].placeholder = I18n.t('taskedit.taskTitlePlaceHolder')
    options.fields['taskTitle'].autoCapitalize = 'none'

    return (
      <View style={styles.container}>

        <Form ref='taskeditForm'
          type={taskeditForm}
          options={options}
      />
      <Button style={styles.button} onPress={this.handlePressSend.bind(this)}>
        {I18n.t('taskedit.sendButton')}
      </Button>
      <Button style={styles.button} onPress={this.handlePressSave.bind(this)}>
        {I18n.t('taskedit.saveButton')}
      </Button>
      <Button style={styles.button} onPress={() => this.props.onCancel()}>
        {I18n.t('taskedit.cancelButton')}
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
