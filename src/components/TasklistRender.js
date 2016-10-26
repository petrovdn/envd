import React, { Component } from 'react'
import {
  Alert,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import { SwipeListView } from 'react-native-swipe-list-view'
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

export default class extends Component {
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      listViewData: this.props.tasklist
    }
  }

  deleteRow (secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow()
    const newData = [...this.state.listViewData]
    newData.splice(rowId, 1)
    this.setState({listViewData: newData})
  }

  componentWillReceiveProps (nextprops) {
    this.setState({ listViewData: nextprops.tasklist })
  }

  render () {
    return (
      <View style={styles.container}>
        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          enableEmptySections
          renderRow={data => (
            <TouchableHighlight onPress={() => console.log()}
              underlayColor={'#AAA'}>
              <View style={styles.rowFront}>
                <View>
                  <Text> № {data[0]} </Text>
                  <Text> {data[1]}</Text>
                  <Text> Статус: {data[2]}, Дата создания: {data[3]}</Text>
                </View>
              </View>
            </TouchableHighlight>
      )}

          renderHiddenRow={(data, secId, rowId, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => Alert.alert(
                              'Удалить заявку?',
                              '',
                  [
                    {text: 'Отменить', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'Удалить', onPress: () => this.deleteRow(secId, rowId, rowMap)}
                  ]
              )}>
                <Text style={styles.backTextWhite}>Удалить</Text>
              </TouchableOpacity>
            </View>
      )}
          leftOpenValue={0}
          rightOpenValue={-100}
      />
        <View style={styles.bottom} />
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 8,
    justifyContent: 'center'
  },
  bottom: {
    flex: 1
  },
  rowFront: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    backgroundColor: '#CCC',
    borderBottomColor: 'darkgreen',
    borderBottomWidth: 1,
    height: 70
  },
  rowBack: {
    alignItems: 'stretch',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 100
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 110
  },
  backRightBtnRight: {
    backgroundColor: 'darkgreen',
    right: 0
  },
  backTextWhite: {
    color: 'white'
  }
})
