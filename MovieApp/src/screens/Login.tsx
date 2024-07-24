import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля");
      return;
    }

    try {
      console.log("Attempting to login with", { username, password });
      await login(username, password);
      const email = await AsyncStorage.getItem("email");
      console.log("Login successful. Email:", email);
      Alert.alert("Вход успешен", "Вы успешно вошли в систему.");
      navigation.navigate("Home");
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Ошибка входа", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={["rgba(252, 9, 76, 0.8)", "transparent"]}
        style={styles.gradient}
      />
      <Text style={styles.title}>Вход</Text>
      <TextInput
        style={styles.input}
        placeholder="Имя пользователя"
        placeholderTextColor="#999"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        placeholderTextColor="#999"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Войти</Text>
        </Pressable>
        <Pressable
          style={styles.linkButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.linkButtonText}>
            Нет аккаунта? Зарегистрироваться
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1B1819",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 32,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "rgba(252, 9, 76, 0.5)",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "rgba(27, 24, 25, 0.8)",
    color: "#FFFFFF",
    borderRadius: 25,
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "rgb(252, 9, 76)",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkButton: {
    paddingVertical: 8,
  },
  linkButtonText: {
    color: "#FC094C",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginScreen;
