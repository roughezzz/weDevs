import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Actions } from "react-native-router-flux";

export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }
  signupHandler = () =>{
    console.log('SignUp');
    const adminToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMCIsImlhdCI6MTU3NTc4NTI4NSwibmJmIjoxNTc1Nzg1Mjg1LCJleHAiOjE1NzYzOTAwODUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.VPwbM7-4MjAFUf72MReQEMcJmYBR6UvMOa97tXFPV9U';
    fetch("http://172.17.0.1:8000/wp-json/wp/v2/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    })
      .then(function(response) {
        if(response.status === 201){
          Alert.alert(
            'Success',
            'New User Added',
            [{text: 'Take me to login', onPress:()=> Actions.login()}]
          )
        }
        else {
          Alert.alert(
            'Error',
            'Username or Email Exists',
            [{text: 'Okay'}]
          )
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.welcome}>Signup Screen</Text>
        <View>
          <TextInput 
            style={styles.inputField} 
            placeholder="Username" 
            onChangeText={username=> this.setState({username})}
            value={this.state.username}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password=> this.setState({password})}
            value={this.state.password}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Email"
            onChangeText={email=> this.setState({email})}
            value={this.state.email}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}
              onPress={this.signupHandler}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => Actions.login()}
            >
              <Text style={styles.buttonText}>Log In</Text>
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
