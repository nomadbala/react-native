import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  Button,
} from "react-native";
import { ScrollView } from "react-native-web";

const title = "Home";

export default function App() {
  const [login, setLogin] = useState("");

  const [password, setPassword] = useState("");

  let [disabled, setDisabled] = useState(true);

  useEffect(() => {
    checkForm(login, password, setDisabled);
  });

  const resetForm = () => {
    setLogin("");
    setPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(login) => {
          setLogin(login);
        }}
        value={login}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        password={true}
        onChangeText={(password) => {
          setPassword(password);
        }}
        value={password}
      />
      <Button
        title="Sign in"
        color="#000"
        disabled={disabled}
        onPress={() => checkPassword(login, password, setLogin, setPassword)}
      />
      <Button title="Register" color="#000" />
      <Button title="Reset" onPress={resetForm} />
    </SafeAreaView>
  );
}

function checkForm(login, password, setDisabled) {
  if (login.length && password.length !== 0) {
    setDisabled(false);
  } else {
    setDisabled(true);
  }
}

function checkPassword(login, password, setLogin, setPassword) {
  const defaultLogin = "admin";
  const defaultPassword = "qwerty123";

  if (login.length === 0 || password.length < 8) {
    alert("Не успешный логин");
  }

  if (defaultLogin === login && defaultPassword === password) {
    alert("Успешный логин");
    setLogin("");
    setPassword("");
  } else {
    alert("Неверные пароли");
    setLogin("");
    setPassword("");
  }
}

function TextView(hooks) {
  if (Platform.OS === "web") {
    return <h1>{hooks.web}</h1>;
  } else {
    return <Text>{hooks.mobile}</Text>;
  }
}

function getTitle() {
  return title;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 16,
    padding: 4,
  },
});
