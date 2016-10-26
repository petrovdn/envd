/**
 * # FormButton.js
 *
 * Display a button that responds to onPress and is colored appropriately
 */
'use strict'
/**
 * ## Imports
 *
 * React
 */
import React from 'react'
import
{
  StyleSheet,
  View,
  Text
} from 'react-native'

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  signin: {
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    backgroundColor: '#6ec740',
    borderColor: '#6ec740'
  },
  nestedViewStyle: {
  },
  textButton: {
    fontSize: 18
  }

})

var FormButton = React.createClass({
  /**
   * ### render
   *
   * Display the Button
   */
  render () {
    return (
      <View style={styles.signin}>
        <Button style={styles.button}
          isDisabled={this.props.isDisabled}
          onPress={this.props.onPress} >
          <View style={styles.nestedViewStyle}>
            <Text style={styles.textButton}>{this.props.buttonText}</Text>
          </View>
        </Button>
      </View>
    )
  }
})



module.exports = FormButton
