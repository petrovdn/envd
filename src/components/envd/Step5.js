
'use strict'
import NavigationBar from 'react-native-navbar'
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TextInput
}
from 'react-native'

import NumTextInput from 'react-native-num-textinput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CONFIG from '../../lib/config'
let Theme = CONFIG.COLOR_SCHEME.SCHEME_CURRENT

import ErrorAlert from '../../components/ErrorAlert'

function number_format (number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec)
      return '' + (Math.round(n * k) / k)
        .toFixed(prec)
    }
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1)
      .join('0')
  }
  return s.join(dec)
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      factor1: this.props.factor1,
      factor2: this.props.factor2,
      factor3: this.props.factor3,
      taxRate: this.props.taxRate,
      k2: this.props.k2,
      taxBeforeInsurance: this.props.taxBeforeInsurance
    }
  }

  onPressForvard () {
    this.props.handleSteps('forvard', 'step5', this.state, this._tax())
  }
  onPressBack () {
    this.props.handleSteps('back', 'step5')
  }

  _tax () {
    let taxBase = Number(this.props.taxBase)
    let factor1 = Number(this.state.factor1)
    let factor2 = Number(this.state.factor2)
    let factor3 = Number(this.state.factor3)
    let k2 = Number(this.state.k2)
    let taxRate = Number(this.state.taxRate)
    let tax = taxBase * (factor1 + factor2 + factor3) * 1.7980 * k2 * taxRate / 100
    return tax
  }

  onChange (val) {
    this.setState(val)
  }

  render () {
    return (
      <View style={[styles.container, {backgroundColor: this.props.theme.COLOR_BACK}]}>
        <NavigationBar
          style={{backgroundColor: this.props.theme.COLOR_NAVBAR, height: 60}}
          title={{
            style: {fontSize: 20},
            title: 'ЕНВД за ' + this.props.quarter + ' квартал',
            tintColor: 'white'
          }}
          leftButton={{
            title: '<=',
            tintColor: 'white',
            handler: this.onPressBack.bind(this)
          }} />
          <View style={styles.containerData}>
            <View style={styles.boxHor}>
              <View>
                <Text>Базовая доходность</Text>
                <Text style={styles.textBig}>{number_format(this.props.taxBase, 0, '', ' ')} рублей</Text>
              </View>
              <Image style={styles.mark}
                source={require('../../images/question.png')}
            />
            </View>
            <View style={[styles.boxVer, {marginRight: 20}, styles.line]}>
              <Text style={{marginTop: 10}}>Площадь торгового зала</Text>
              <View style={styles.boxHorMargin}>
                <NumTextInput
                  style={styles.factors} onChangeText={(text) => this.onChange({factor1: Number(text)})}
                  value={this.state.factor1.toString() === '0' ? '' : this.state.factor1.toString()}
                  placeholder={this.props.quarter === 1 ? 'ЯНВАРЬ' : this.props.quarter === 2 ? 'АПРЕЛЬ' : this.props.quarter === 3 ? 'ИЮЛЬ' : 'ОКТЯБРЬ'} />
                <NumTextInput
                  style={styles.factors} onChangeText={(text) => this.onChange({factor2: Number(text)})}
                  value={this.state.factor2.toString() === '0' ? '' : this.state.factor2.toString()}
                  placeholder={this.props.quarter === 1 ? 'ФЕВРАЛЬ' : this.props.quarter === 2 ? 'МАЙ' : this.props.quarter === 3 ? 'АВГУСТ' : 'НОЯБРЬ'} />
                <NumTextInput
                  style={styles.factors} onChangeText={(text) => this.onChange({factor3: Number(text)})}
                  value={this.state.factor3.toString() === '0' ? '' : this.state.factor3.toString()}
                  placeholder={this.props.quarter === 1 ? 'МАРТ' : this.props.quarter === 2 ? 'ИЮНЬ' : this.props.quarter === 3 ? 'СЕНТЯБРЬ' : 'ДЕКАБРЬ'} />
              </View>
            </View>
            <View style={[styles.boxHorMargin, styles.line]}>
              <View style={styles.boxVer}>
                <Text style={{marginTop: 10}}>K1 (за 2016 год)       (К2)              Ставка налога</Text>
                <View style={styles.boxHorMargin}>
                  <NumTextInput
                    style={styles.factors}
                    editable={false}
                    value={'1.7980'}
                    />
                  <NumTextInput
                    keyboardType='numeric'
                    style={styles.factors} onChangeText={(text) => this.onChange({k2: Number(text)})}
                    value={this.state.k2.toString() === '0' ? '' : this.state.k2.toString()}
                    placeholder='K2' />
                  <TextInput
                    style={styles.factors} onChangeText={(text) => this.onChange({taxRate: Number(text)})}
                    value={this.state.taxRate.toString() === '0' ? '' : this.state.taxRate.toString()}
                    placeholder='%' />
                </View>
              </View>
            </View>
            <View style={[styles.boxHor, styles.line, {backgroundColor: Theme.COLOR_BACK2, marginRight: 20}]}>
              <View style={{flex: 2}}>
                <Text style={styles.rightBottomText}>Сумма налога</Text>
                <Text style={styles.textBig}>{number_format(this._tax(), 0, '', ' ')} руб.</Text>
              </View>
              <View style={styles.rightBottomBox}>
              <Text style={styles.rightBottomText}></Text>
              </View>
            </View>
          </View>
        <TouchableHighlight style={{
          backgroundColor: this.props.theme.COLOR_BUTTON2,
          padding: 15,
          height: 60
        }}
          underlayColor='lavenderblush'
          onPress={() => this.onPressForvard()}>
          <Text style={styles.textButton}>3 / 6      ПРОДОЛЖИТЬ</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

//

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  containerData: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 20
  },
  boxHor: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boxHorMargin: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 20
  },
  boxVer: {
    flex: 1,
    flexDirection: 'column'
  },
  textBig: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  textBigBig: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center'
  },
  factors: {
    flex: 1,
    height: 42,
    padding: 4,
    margin: 5,
    fontSize: 18,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'white',
    borderColor: Theme.COLOR_LINE
  },
  textButton: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  mark: {
    height: 55,
    width: 55
  },
  line: {
    borderTopColor: Theme.COLOR_LINE,
    borderTopWidth: 2
  },
  rightBottomBox: {
    padding: 10
  },
  rightBottomText: {
    borderLeftColor: Theme.COLOR_LINE,
    borderLeftWidth: 2
  }
})
