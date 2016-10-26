
'use strict'
import NavigationBar from 'react-native-navbar'
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  Text,
  TouchableHighlight
}
from 'react-native'

import CONFIG from '../../lib/config'
let Theme = CONFIG.COLOR_SCHEME.SCHEME_CURRENT

import ErrorAlert from '../../components/ErrorAlert'

export default class extends Component {
  constructor (props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      factor1: this.props.factor1,
      factor2: this.props.factor2,
      factor3: this.props.factor3,
      taxRate: this.props.taxRate,
      k2: this.props.k2
    }
  }

  onPressForvard () {
    this.props.handleSteps('forvard', 'step8', this.state)
  }
  onPressBack () {
    this.props.handleSteps('back', 'step8')
  }

  render () {
    return (
      <View style={[styles.container, {backgroundColor: this.props.theme.COLOR_BACK}]}>
        <NavigationBar
          style={{backgroundColor: this.props.theme.COLOR_NAVBAR, height: 60}}
          title={{
            style: {fontSize: 20},
            title: 'Документы сформированы',
            tintColor: 'white'
          }}
          leftButton={{
            title: '<=',
            tintColor: 'white',
            handler: this.onPressBack.bind(this)
          }} />
        <View style={styles.containerData}>
          <View>
            <Text style={styles.text}>В срок
              <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}> до 20 октября </Text>
              Вам необходимо распечатать Декларацию и отнести или послать ее по почте в налоговую инспекцию.
            </Text>
          </View>
          <View>
            <Text style={styles.text}>В срок
              <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}> до 25 октября </Text>
              Вам необходимо оплатить налог в сумме 12 530 рублей в любом отделении или в банкомате Сбербанка.
            </Text>
          </View>
          <View>
            <Text style={styles.textBlue}>Декларация ЕНВД за 3 квартал 2016 (PDF)</Text>
          </View>
          <View>
            <Text style={styles.textBlue}>Квитанция Сбербанка на 12 530 р (PDF)</Text>
          </View>

          <View>
            <Text style={styles.textBig}>№5258 ИФНС по Ленинскому району г. Нижнего Новгорода</Text>
          </View>
          <View>
            <Text style={styles.textBig}>603000, Нижний Новгород, ул. Ильинская, 52А. (831) 422-22-01</Text>
          </View>

          <View>
            <Text style={styles.text}>603000, Нижний Новгород, ул. Ильинская, 52А. (831) 422-22-01</Text>
          </View>



  </View>
        <TouchableHighlight style={{
          backgroundColor: this.props.theme.COLOR_BUTTON2,
          padding: 15,
          height: 60
        }}
          underlayColor='lavenderblush'
          onPress={() => this.onPressForvard()}>
          <Text style={styles.textButton}>Выслать все на konstantin@yandex.ru</Text>
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
    margin: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
    borderRadius: 8,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowOpacity: 20,
    shadowRadius: 5
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10
  },
  textBig: {
    fontSize: 18,
    fontWeight: '500'
  },
  textBlue: {
    fontSize: 18,
    fontWeight: '500',
    color: 'blue'
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  inputs: {
    flex: 1,
    height: 84,
    padding: 4,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    borderWidth: 1
  },
  textButton: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
