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

const RegisterScreen = ({ navigation }: any) => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Ошибка", "Пароли не совпадают");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Ошибка", "Пароль должен содержать не менее 6 символов");
      return;
    }

    try {
      await register(username, password, email);
      Alert.alert("Регистрация успешна", "Вы успешно зарегистрировались.");
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("Ошибка регистрации", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={["rgba(252, 9, 76, 0.8)", "transparent"]}
        style={styles.gradient}
      />
      <Text style={styles.title}>Регистрация</Text>
      <TextInput
        style={styles.input}
        placeholder="Имя пользователя"
        placeholderTextColor="#999"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
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
      <TextInput
        style={styles.input}
        placeholder="Подтвердите пароль"
        placeholderTextColor="#999"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Зарегистрироваться</Text>
        </Pressable>
        <Pressable
          style={styles.linkButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.linkButtonText}>Уже есть аккаунт? Войти</Text>
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

export default RegisterScreen;
