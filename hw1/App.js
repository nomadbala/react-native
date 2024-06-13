import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";

const App = () => {
  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.text}>Your name</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} />
        <Text style={styles.text}>Your phone</Text>
        <TextInput style={styles.input} onChangeText={setPhone} value={phone} />
        <Text style={styles.text}>Your email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} />
        <Pressable style={styles.pressable}>
          <Text style={styles.pressableText}>Send</Text>
        </Pressable>
      </View>

      <View style={styles.output}>
        <Text style={styles.text}>Your name: {name}</Text>
        <Text style={styles.text}>Your phone: {phone}</Text>
        <Text style={styles.text}>Your email: {email}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  pressable: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "blue",
    marginTop: 16,
  },
  pressableText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    paddingVertical: 6,
    width: "80%",
    paddingLeft: 8,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 16,
  },
  output: {
    alignItems: "center",
    marginVertical: 16,
    borderWidth: 1,
    width: "50%",
    margin: "auto",
    borderRadius: 10,
    gap: 16,
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default App;
