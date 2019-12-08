import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView, Alert
} from "react-native";

import { Actions } from "react-native-router-flux";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  loginHandler = () => {
    // console.log("Login");
    // () => Actions.home()
    fetch("http://172.17.0.1:8000/wp-json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(user) {
        if (user.token) {
          Actions.home({
            token: user.token
          });
        }
        else{
          Alert.alert(
            'Cannot Login',
            'Invalid Username or Password',
            [{text: 'Okay'}]
          )
        }
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.welcome}>Login Screen</Text>
        <View>
          <TextInput
            style={styles.inputField}
            placeholder="Username"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.loginHandler}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => Actions.signup()}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004D40"
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: "#E0F2F1"
  },
  inputField: {
    width: 300,
    height: 40,
    borderColor: "#E0F2F1",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    color: "#E0F2F1"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#E0F2F1",
    paddingVertical: 10,
    width: 140,
    borderRadius: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#004D40",
    fontSize: 16,
    fontWeight: "500"
  }
});
