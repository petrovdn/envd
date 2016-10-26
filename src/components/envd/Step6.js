
'use strict'
import NavigationBar from 'react-native-navbar'
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput
}
from 'react-native'

import NumTextInput from 'react-native-num-textinput'

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
      insurancePayments: this.props.insurancePayments,
      taxDecrease: this.props.taxDecrease,
      taxToPay: this.props.taxToPay
    }
  }

  onPressForvard () {
    this.props.handleSteps('forvard', 'step6', this.state)
  }
  onPressBack () {
    this.props.handleSteps('back', 'step6')
  }
  _taxDecrease () {
    Math.min(this.state.insurancePayments, this.props.taxBeforeInsurance)
  }

  onChange (insurancePayments) {
    let taxDecrease = Math.min(insurancePayments, this.props.taxBeforeInsurance)
    let taxToPay = this.props.taxBeforeInsurance - taxDecrease
    this.setState({
      insurancePayments: insurancePayments,
      taxDecrease: taxDecrease,
      taxToPay: taxToPay
    })
  }

  render () {
    return (
      <View style={[styles.container, {backgroundColor: this.props.theme.COLOR_BACK}]}>
        <NavigationBar
          style={{backgroundColor: this.props.theme.COLOR_NAVBAR, height: 60}}
          title={{
            style: {fontSize: 20},
            title: 'Страховые взносы',
            tintColor: 'white'
          }}
          leftButton={{
            title: '<=',
            tintColor: 'white',
            handler: this.onPressBack.bind(this)
          }} />
        <View style={styles.containerData}>
        <View style={styles.boxHor}>
          <View style={styles.box2}>
            <Text style={styles.textBold}>Страховые взносы, уплаченные в {this.props.quarter} квартале {this.props.year} года</Text>
          </View>
          <View style={styles.box1}>
            <NumTextInput
              style={[styles.inputs, {borderColor: this.props.theme.COLOR_LINE}]} onChangeText={(text) => this.onChange(Number(text))}
              value={this.state.insurancePayments.toString() === '0' ? '' : this.state.insurancePayments.toString()}
              />
          </View>
        </View>
        <View style={styles.boxHor}>
          <View style={styles.box2}>
            <Text>Сумма налога может быть уменьшена на:</Text>
          </View>
          <View style={styles.box1}>
            <Text style={[styles.textBig, {
              backgroundColor: this.props.theme.COLOR_BACK,
              borderColor: this.props.theme.COLOR_LINE}]}>{number_format(this.state.taxDecrease, 0, '', ' ')}</Text>
          </View>
        </View>
        <View style={styles.boxHor}>
          <View style={styles.box2}>
            <Text>Сумма налога до учета страховых взносов:</Text>
          </View>
          <View style={styles.box1}>
            <Text style={[styles.textBig, {
              backgroundColor: this.props.theme.COLOR_BACK,
              borderColor: this.props.theme.COLOR_LINE}]}>{number_format(this.props.taxBeforeInsurance, 0, '', ' ')}</Text>
          </View>
        </View>
        <View style={styles.boxHor}>
          <View style={styles.box2}>
            <Text style={styles.textBold}>Сумма налога к уплате за вычетом страховых взносов:</Text>
          </View>
          <View style={styles.box1}>
            <Text style={[styles.textBig, {
              backgroundColor: this.props.theme.COLOR_BACK,
              borderColor: this.props.theme.COLOR_LINE}]}>{number_format(this.state.taxToPay, 0, '', ' ')}</Text>
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
          <Text style={styles.textButton}>4 / 6      ПРОДОЛЖИТЬ</Text>
        </TouchableHighlight>
      </View>
    )
  }
}






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
    flexDirection: 'row'
  },
  boxVer: {
    flex: 1,
    flexDirection: 'column'
  },
  box2: {
    flex: 2,
    alignItems: 'flex-start'
  },
  box1: {
    flex: 1,
    alignItems: 'center'
  },
  textBig: {
    height: 42,
    width: 100,
    padding: 5,
    margin: 5,
    fontSize: 22,
    textAlign: 'right',
    borderWidth: 1,
    borderRadius: 4
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500'
  },
  inputs: {
    height: 42,
    width: 100,
    padding: 5,
    margin: 5,
    fontSize: 22,
    textAlign: 'right',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'white'
  },
  textButton: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
