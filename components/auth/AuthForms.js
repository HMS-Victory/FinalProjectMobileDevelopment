import { View, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import Button1 from "./Button1";
import FormInput from "./FormInput";
import FlatButton from "./FlatButton";
import { useNavigation } from "@react-navigation/native";
import { validate } from "../../util/validate";

function AuthForms({ login, onSubmit }) {
  const navigation=useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    confirmEmail: false,
    password: false,
    confirmPassword: false,
  });
  const [inputValues, setInputValues] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  function UpdateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setInputValues({ ...inputValues, email: enteredValue });
        break;
      case "confirmEmail":
        setInputValues({ ...inputValues, confirmEmail: enteredValue });
        break;
      case "password":
        setInputValues({ ...inputValues, password: enteredValue });
        break;
      case "confirmPassword":
        setInputValues({ ...inputValues, confirmPassword: enteredValue });
        break;
    }
  }

  function switchAuthModeHandler(){
    if(login){
      navigation.replace('Signup');
    }else{
      navigation.replace('Login')
    }
  }

  function onPressHandler() {
    
    const credentials = validate({
      email: inputValues.email,
      confirmEmail: inputValues.confirmEmail,
      password: inputValues.password,
      confirmPassword: inputValues.password,
    },
    login);
    if (credentials.containsInvalid) {
      Alert.alert("Invalid input", "Please check your credentials");
      setCredentialsInvalid(credentials);
      return false;
    }
    onSubmit(credentials);
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.container}>
        <FormInput
          label="Email"
          onUpdateValue={UpdateInputValueHandler.bind(this, "email")}
          value={inputValues.email}
          keyboardType="email-address"
          isInvalid={credentialsInvalid.email}
        />
        {!login && (
          <FormInput
            label="Confirm Email"
            onUpdateValue={UpdateInputValueHandler.bind(this, "confirmEmail")}
            value={inputValues.confirmEmail}
            keyboardType="email-address"
            isInvalid={credentialsInvalid.confirmEmail}
          />
        )}

        <FormInput
          label="Password"
          onUpdateValue={UpdateInputValueHandler.bind(this, "password")}
          value={inputValues.password}
          secure
          isInvalid={credentialsInvalid.password}
        />
        {!login && (
          <FormInput
            label="Confirm Password"
            onUpdateValue={UpdateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            value={inputValues.confirmPassword}
            secure
            isInvalid={credentialsInvalid.confirmPassword}
          />
        )}
        <View>
          <Button1 onPress={onPressHandler}>
            {login ? "Log In" : "Sign Up"}
          </Button1>
          <FlatButton onPress={switchAuthModeHandler}>
            {!login
              ? "Already have an account? sign in"
              : "Don't have an account? sign up"}
          </FlatButton>
        </View>
      </View>
    </View>
  );
}

export default AuthForms;

const styles = StyleSheet.create({
  formContainer: {
    minHeight:350,
    backgroundColor: "#eeeeee",
    padding: 15,
    justifyContent: "center",
    marginTop: "45%",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    marginHorizontal: 5,
    borderRadius: 7,
  },
  container: {
    flex: 1,
  },
});
