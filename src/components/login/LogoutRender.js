
import React, {Component} from 'react'
import
{
  Text,
  TouchableHighlight,
  View
}
from 'react-native'

export default class extends Component {

  onSubmit () {
    this.props.onLogoutPress()
  }

  render () {
    this.errorAlert.checkError(this.props.error)
    return (
      <View style={{marginTop: 150}}>
        <View>
          <Text>Форма выхода</Text>
        </View>
        <TouchableHighlight onPress={() => this.onSubmit()} underlayColor='#99d9f4'>
          <Text>Выйти</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
