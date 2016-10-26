/**
 * # Main.js
 *  This is the main app screen
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as taskboxActions from '../reducers/taskbox/taskboxActions'
import * as globalActions from '../reducers/global/globalActions'
import * as profileActions from '../reducers/profile/profileActions'

/**
 * Router
 */
import {Actions} from 'react-native-router-flux'

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header'

/**
 * The components needed from React
 */
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  Text
}
from 'react-native'

import TasklistRender from '../components/TasklistRender'
import TaskeditRender from '../components/TaskeditRender'

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    taskbox: {
      form: {
        state: state.taskbox.form.state,
        isFetching: state.taskbox.form.isFetching,
        tasklist: state.taskbox.form.tasklist
      }
    },
    global: {
      currentUser: state.global.currentUser
    }
  }
};

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...taskboxActions, ...globalActions, ...profileActions }, dispatch)
  }
}

/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

class TaskBox extends Component {

  handlePressAddTask () {
    this.props.actions.taskeditState('Add')
  }
  handlePressGetList () {
    this.props.actions.getTasklist(this.props.global.currentUser)
  }
  /**
   * ### componentDidMount
   *
   * During Hot Loading, when the component mounts due the state
   * immediately being in a "logged in" state, we need to just set the
   * form fields.  Otherwise, we need to go fetch the fields
   */
  componentDidMount () {
    //this.props.actions.getTasklist(this.props.global.currentUser)
  }

  render () {
    if (this.props.taskbox.form.state === 'TASKLIST') {
      return (
        <View style={styles.container}>
          <View>
            <Header isFetching={this.props.taskbox.form.isFetching}
              showState={this.props.global.showState}
              currentState={this.props.global.currentState}
              onGetState={this.props.actions.getState}
              onSetState={this.props.actions.setState} />
            <Button style={styles.button} onPress={this.handlePressGetList.bind(this)}>
              {I18n.t('taskbox.getlist')}
            </Button>
            <Button style={styles.button} onPress={this.handlePressAddTask.bind(this)}>
              {I18n.t('taskbox.addtask')}
            </Button>
            <TasklistRender tasklist={this.props.taskbox.form.tasklist} />
          </View>
        </View>
    )
    } else if (this.props.taskbox.form.state === 'TASKEDIT') {
      return (
        <View style={styles.container}>
          <View>
            <Header isFetching={this.props.taskbox.form.isFetching}
              showState={this.props.global.showState}
              currentState={this.props.global.currentState}
              onGetState={this.props.actions.getState}
              onSetState={this.props.actions.setState} />
            <TaskeditRender
              onCancel={this.props.actions.tasklistState}
              onSave = {this.props.actions.addTask}
              onSend = {this.props.actions.addTask}

             />
          </View>
        </View>
        )
    }
  }
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    marginBottom: 80,
    flexDirection: 'column',
    flex: 1
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#6ec740',
    borderColor: '#6ec740',
    marginLeft: 10,
    marginRight: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskBox)
