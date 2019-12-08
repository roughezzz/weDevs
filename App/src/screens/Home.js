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

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: ""
    };
  }

  edit = () => {
    fetch("http://172.17.0.1:8000/wp-json/wp/v2/users/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`
      },
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        Alert.alert(
          'Success',
          'Changes have been made',
          [{text: 'Okay'}]
        );
        console.log(data);
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.welcome}>Home Screen</Text>
        <View>
          <TextInput
            style={styles.inputField}
            placeholder="First Name"
            value={this.state.first_name}
            onChangeText={first_name => this.setState({ first_name })}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Last Name"
            value={this.state.last_name}
            onChangeText={last_name => this.setState({ last_name })}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.edit}>
              <Text style={styles.buttonText}>Edit</Text>
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
