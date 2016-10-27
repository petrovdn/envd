
'use strict'
import NavigationBar from 'react-native-navbar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as envdboxActions from '../reducers/envdbox/envdboxActions'
import * as globalActions from '../reducers/global/globalActions'
import * as profileActions from '../reducers/profile/profileActions'

import {Actions} from 'react-native-router-flux'

import CONFIG from '../lib/config'
let Theme = CONFIG.COLOR_SCHEME.SCHEME_CURRENT

import React, {Component} from 'react'
import
{
  StyleSheet,
  View
}
from 'react-native'

import EnvdList from '../components/envd/EnvdList'
import Step1 from '../components/envd/Step1'
import Step2 from '../components/envd/Step2'
import Step3 from '../components/envd/Step3'
import Step4 from '../components/envd/Step4'
import Step5 from '../components/envd/Step5'
import Step6 from '../components/envd/Step6'
import Step7 from '../components/envd/Step7'
import Step8 from '../components/envd/Step8'

function mapStateToProps (state) {
  return {
    envdbox: {
      form: {
        state: state.envdbox.form.state,
        envdlist: state.envdbox.form.envdlist,
        Activitylist: state.envdbox.form.Activitylist,
        disabled: state.envdbox.form.disabled,
        error: state.envdbox.form.error,
        isValid: state.envdbox.form.isValid,
        isFetching: state.envdbox.form.isFetching,
        isChanged: state.envdbox.form.isChanged,
        fields: {
          inn: state.envdbox.form.fields.inn,
          year: state.envdbox.form.fields.year,
          name: state.envdbox.form.fields.name,
          lastName: state.envdbox.form.fields.lastName,
          patronymic: state.envdbox.form.fields.patronymic,
          address: {
            subjectCode: state.envdbox.form.fields.address.subjectCode,
            index: state.envdbox.form.fields.address.index,
            district: state.envdbox.form.fields.address.district,
            city: state.envdbox.form.fields.address.city,
            town: state.envdbox.form.fields.address.town,
            street: state.envdbox.form.fields.address.street,
            house: state.envdbox.form.fields.address.house,
            building: state.envdbox.form.fields.address.building,
            flat: state.envdbox.form.fields.address.flat
          },
          ifns: state.envdbox.form.fields.ifns,
          okved: state.envdbox.form.fields.okved,
          activityType: state.envdbox.form.fields.activityType,
          quarter: state.envdbox.form.fields.quarter,
          k2: state.envdbox.form.fields.k2,
          factors: state.envdbox.form.fields.factors,
          taxBase: state.envdbox.form.fields.taxBase,
          taxRate: state.envdbox.form.fields.taxRate,
          insurancePayments: state.envdbox.form.fields.insurancePayments,
          taxDecrease: state.envdbox.form.fields.taxDecrease,
          taxBeforeInsurance: state.envdbox.form.fields.taxBeforeInsurance,
          taxToPay: state.envdbox.form.fields.taxToPay
        }
      }
    },
    global: {
      currentUser: state.global.currentUser,
      showState: state.global.showState
    },
    device: {
      theme: state.device.theme
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...envdboxActions, ...globalActions, ...profileActions }, dispatch)
  }
}

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

class EnvdBox extends Component {

  componentWillReceiveProps (nextprops) {
    this.setState({ navTitle: nextprops.state })
  }

_getTitle () {
    return this.state.navTitle
}

  handleSteps (direction, currentstep, value1, value2) {
    switch (currentstep) {
      case 'step0':
        this.props.actions.step1State()
        return
      case 'step1':
        if (direction === 'forvard') {
          this.props.actions.addStep1Data(value1)
          this.props.actions.step2State()
        } else {
          this.props.actions.envdlistState()
        }
        return
      case 'step2':
        if (direction === 'forvard') {
          this.props.actions.step3State()
        } else {
          this.props.actions.step1State()
        }
        return
      case 'step3':
        if (direction === 'forvard') {
          this.props.actions.addStep3Data(value1, value2)
          this.props.actions.step4State()
        } else {
          this.props.actions.step2State()
        }
        return
      case 'step4':  // ввод адреса
        if (direction === 'forvard') {
          this.props.actions.addStep4Data(value1)
          this.props.actions.step5State()
        } else {
          this.props.actions.step3State()
        }
        return
      case 'step5': // ввод коэффициентов и факторов
        if (direction === 'forvard') {
          this.props.actions.addStep5Data(value1, value2)
          this.props.actions.step6State()
        } else {
          this.props.actions.step4State()
        }
        return
      case 'step6':
        if (direction === 'forvard') {
          this.props.actions.addStep6Data(value1)
          this.props.actions.step7State()
        } else {
          this.props.actions.step5State()
        }
        return
      case 'step7':
        if (direction === 'forvard') {
          this.props.actions.step8State()
        } else {
          this.props.actions.step6State()
        }
        return
      case 'step8':
        if (direction === 'forvard') {
          this.props.actions.envdlistState()
        } else {
          this.props.actions.step7State()
        }
        return
    }
  }

  handlePressAddEnvd () {
    this.handleSteps('forvard', 'step0')
  }

  editEnvd (id) {
    this.props.actions.getEnvd (id, this.props.global.currentUser)
  }

  handlePressAddEnvdList () {
    this.props.actions.addEnvd(this.props.global.currentUser)
  }

  _onPressBack () {
    this.handleSteps('forvard', 'step0')
  }


  componentDidMount () {
    this.props.actions.getEnvdList(this.props.global.currentUser)
    this.props.actions.getActivitylist(this.props.global.currentUser)
  }

  handleSideMenu () {
      Actions.refresh({key: 'drawer', open: value => !value });
  }

  render () {
    switch (this.props.envdbox.form.state) {
      case 'ENVDLIST':
        return (
          <View style={styles.container}>
            <NavigationBar
              style={{backgroundColor: this.props.device.theme.COLOR_NAVBAR, height: 60}}
              title={{
                style: {fontSize: 20},
                title: 'Отчетность ИП',
                tintColor: 'white'
              }}
              leftButton={{
                title: '==',
                tintColor: 'white',
                handler: this.handleSideMenu.bind(this)
              }} />
            <EnvdList
              theme={this.props.device.theme}
              envdlist={this.props.envdbox.form.envdlist}
              editEnvd={this.editEnvd.bind(this)}
              handleSideMenu={this.handleSideMenu.bind(this)}
            />
          </View>
          // <TouchableHighlight style={styles.button}
          //   underlayColor='lavenderblush'
          //   onPress={this.handlePressAddEnvd.bind(this)}>
          //   <Text style={styles.textButton}>Новая декларация</Text>
          // </TouchableHighlight>
        )
      case 'STEP1':
        return (
          <View style={styles.container}>
            <Step1
              theme={this.props.device.theme}
              inn={this.props.envdbox.form.fields.inn}
              name={this.props.envdbox.form.fields.name}
              lastName={this.props.envdbox.form.fields.lastName}
              patronymic={this.props.envdbox.form.fields.patronymic}
              okved={this.props.envdbox.form.fields.okved}
              handleSteps={this.handleSteps.bind(this)} />
          </View>
        )
      case 'STEP2':
        return (
          <View style={styles.container}>
            <Step2
              theme={this.props.device.theme}
              handleSteps={this.handleSteps.bind(this)}
              year={this.props.envdbox.form.fields.year}
              quarter={this.props.envdbox.form.fields.quarter} />
          </View>
        )
      case 'STEP3':
        return (
          <View style={styles.container}>
            <Step3
              theme={this.props.device.theme}
              handleSteps={this.handleSteps.bind(this)}
              Activitylist={this.props.envdbox.form.Activitylist}
              activityType={this.props.envdbox.form.fields.activityType}
              taxBase={this.props.envdbox.form.fields.taxBase}
              />
          </View>
        )
      case 'STEP4':
        return (
          <View style={styles.container}>
            <Step4
              theme={this.props.device.theme}
              handleSteps={this.handleSteps.bind(this)}
              city={this.props.envdbox.form.fields.address.city}
              street={this.props.envdbox.form.fields.address.street}
              house={this.props.envdbox.form.fields.address.house}
              building={this.props.envdbox.form.fields.address.building}
              flat={this.props.envdbox.form.fields.address.flat} />
          </View>
        )
      case 'STEP5':
        return (
          <View style={styles.container}>
            <Step5
              theme={this.props.device.theme}
              handleSteps={this.handleSteps.bind(this)}
              quarter={this.props.envdbox.form.fields.quarter}
              taxBase={this.props.envdbox.form.fields.taxBase}
              taxRate={this.props.envdbox.form.fields.taxRate}
              factor1={this.props.envdbox.form.fields.factors[0]}
              factor2={this.props.envdbox.form.fields.factors[1]}
              factor3={this.props.envdbox.form.fields.factors[2]}
              k2={this.props.envdbox.form.fields.k2}
              taxBeforeInsurance={this.props.envdbox.form.fields.taxBeforeInsurance}
               />
          </View>
        )
      case 'STEP6':
        return (
          <View style={styles.container}>
            <Step6
              theme={this.props.device.theme}
              handleSteps={this.handleSteps.bind(this)}
              taxBeforeInsurance={this.props.envdbox.form.fields.taxBeforeInsurance}
              insurancePayments={this.props.envdbox.form.fields.insurancePayments}
              taxDecrease={this.props.envdbox.form.fields.taxDecrease}
              taxToPay={this.props.envdbox.form.fields.taxToPay}
              year={this.props.envdbox.form.fields.year}
              quarter={this.props.envdbox.form.fields.quarter}
              />
          </View>
        )
      case 'STEP7':
        return (
          <View style={styles.container}>
            <Step7
              theme={this.props.device.theme}
              handleSteps={this.handleSteps.bind(this)} />
          </View>
        )
      case 'STEP8':
        return (
          <View style={styles.container}>
            <Step8
              theme={this.props.device.theme}
              handleSteps={this.handleSteps.bind(this)} />
          </View>
        )
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleStyle: {
    fontSize: 20
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: Theme.COLOR_BUTTON2,
    padding: 15,
    height: 60
  },
  textButton: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EnvdBox)
