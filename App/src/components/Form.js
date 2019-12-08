import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class Form extends Component {
  render() {
    const { type } = this.props;
    let dynamicBtn;
    if (type === "Log In") {
      dynamicBtn = <Text style={styles.buttonText}>Sign Up</Text>;
    } else {
      dynamicBtn = <Text style={styles.buttonText}>Log In</Text>;
    }
    return (
      <View>
        <TextInput style={styles.inputField} placeholder="Email" />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{type}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            {dynamicBtn}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
