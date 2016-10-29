
'use strict'

import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { TextInput, View, TouchableHighlight, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

var styles = StyleSheet.create({
  textInput: {
    height: 42,
    width: 300,
    padding: 5,
    margin: 5,
    fontSize: 22,
    textAlign: 'right',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'white'
  }
})

const formOptions = {
  form: 'login',
  touchOnChange: true,
  fields: ['email', 'password'],
};

class TextField extends React.Component {
  render () {
    const { input: { value, onChange } } = this.props
    return (
      <TextInput
        style={[styles.textInput]}
        onChangeText={(value) => onChange(value)}
        value={value} underlineColorAndroid="transparent" selectTextOnFocus={true} {...this.props}
      />
    );
}
}

class LoginRender extends React.Component {

  handeSubmit (email, password) { alert (`email: ${email} and password: ${password}`) }

    render() {
        return (

            <View style = {{marginTop: 200}}>
                <Field
                    name="email"
                    component={TextField}
                    placeholder="Email"
                />
                <Field
                    name="password"
                    component={TextField}
                    placeholder="Password"
                    secureTextEntry={true}

                />
                <TouchableHighlight onPress={() => this.handeSubmit(this.props.email, this.props.password)}>
                    <Text>Submit</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

LoginRender = reduxForm({
  form: 'loginForm'
})(LoginRender)

//LoginRender = connect(mapStateToProps)(LoginRender)

export default LoginRender
