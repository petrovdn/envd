
import React, { Component } from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import NavigationBar from 'react-native-navbar'

import CONFIG from '../../lib/config'
let Theme = CONFIG.COLOR_SCHEME.SCHEME_CURRENT

export default class extends Component {
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      listViewData: this.props.Activitylist,
      activityType: this.props.activityType,
      taxBase: this.props.taxBase
    }
  }
  componentWillReceiveProps (nextprops) {
    this.setState({
      listViewData: nextprops.Activitylist,
      activityType: this.props.activityType,
      taxBase: this.props.taxBase
    })
  }

  onPressForvard (isCopy) {
    this.props.handleSteps('forvard', 'step3', this.state.activityType, this.state.taxBase)
  }

  onPressBack () {
    this.props.handleSteps('back', 'step3')
  }

  deleteRow (secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow()
    const newData = [...this.state.listViewData]
    newData.splice(rowId, 1)
    this.setState({listViewData: newData})
  }

  _pressRow (data, secId, rowId, rowMap) {
    this.setState({
      activityType: data[0],
      taxBase: data[2]
    })
  }

  _renderRow (data, secId, rowId, rowMap) {
    if (data[0] !== this.state.activityType) {
      return (
        <TouchableHighlight onPress={() => this._pressRow(data, secId, rowId, rowMap)}
          underlayColor={'#AAA'}>
          <View style={styles.rowFront}>
            <View>
              <Text style={styles.rowText}>
                <Text style={{ color: 'rgb(252, 100, 75)' }}> {data[1]} </Text>
                {data[3]} </Text>

            </View>
          </View>
        </TouchableHighlight>
    )
    } else {
      return (
        <TouchableHighlight onPress={() => this._pressRow(data, secId, rowId, rowMap)}
          underlayColor={'#AAA'}>
          <View style={styles.rowFrontDetail}>
            <View >
              <Text style={styles.rowTextDetail}>
                {data[1]} {data[3]}
              </Text>
              <Text style={styles.rowDetail}> {data[4]}</Text>
            </View>
          </View>
        </TouchableHighlight>
      )
    }
  }

  render () {
    return (
      <View style={[styles.container, {backgroundColor: this.props.theme.COLOR_BACK}]}>
        <NavigationBar
          style={{backgroundColor: this.props.theme.COLOR_NAVBAR, height: 60}}
          title={{
            style: {fontSize: 20},
            title: 'Вид деятельности',
            tintColor: 'white'
          }}
          leftButton={{
            title: '<=',
            tintColor: 'white',
            handler: this.onPressBack.bind(this)
          }} />
        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          enableEmptySections
          renderRow={(data, secId, rowId, rowMap) => this._renderRow(data, secId, rowId, rowMap)}
      />
        <TouchableHighlight style={{
          backgroundColor: this.props.theme.COLOR_BUTTON2,
          padding: 15,
          height: 60
        }}
          underlayColor='lavenderblush'
          onPress={() => this.onPressForvard()}>
          <Text style={styles.textButton}>1 / 6      ПРОДОЛЖИТЬ</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  rowFront: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgb(173,186,195)',
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowOpacity: 10,
    shadowRadius: 10
  },
  rowFrontDetail: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: Theme.COLOR_BUTTON1,
    borderRadius: 10,
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowOpacity: 10,
    shadowRadius: 10
  },
  rowText: {
    fontSize: 18,
    fontWeight: '500'
  },
  rowTextDetail: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white'
  },
  rowDetail: {
    marginTop: 5,
    fontSize: 14,
    color: 'white'
  },
  textButton: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
