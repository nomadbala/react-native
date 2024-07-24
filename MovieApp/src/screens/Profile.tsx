import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useAuth, User } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ navigation }: any) => {
  const { logout, currentUser, updateAvatar, addCreditCard, removeCreditCard } =
    useAuth();
  const [avatarUri, setAvatarUri] = useState<string>(
    currentUser?.avatarUri || "https://via.placeholder.com/150"
  );
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedCurrentUser = await AsyncStorage.getItem("currentUser");
        if (storedCurrentUser) {
          const user: User = JSON.parse(storedCurrentUser);
          setAvatarUri(user.avatarUri || "https://via.placeholder.com/150");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUserData();
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Home");
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newAvatarUri = result.assets[0].uri;
      setAvatarUri(newAvatarUri);
      await updateAvatar(newAvatarUri);
    }
  };

  const handleAddCard = async () => {
    if (
      isValidCardNumber(cardNumber) &&
      isValidExpiry(cardExpiry) &&
      isValidCVV(cardCVV)
    ) {
      await addCreditCard({
        number: cardNumber.replace(/\s/g, ""),
        expiryDate: cardExpiry,
        cvv: cardCVV,
      });
      Alert.alert("Карта добавлена", "Ваша карта успешно добавлена.");
      setCardNumber("");
      setCardExpiry("");
      setCardCVV("");
      setModalVisible(false);
    } else {
      Alert.alert(
        "Ошибка",
        "Пожалуйста, проверьте правильность введенных данных."
      );
    }
  };

  const handleRemoveCard = async () => {
    await removeCreditCard();
    Alert.alert("Карта удалена", "Ваша карта была успешно удалена.");
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const matches = cleaned.match(/(\d{1,4})/g);
    const formatted = matches ? matches.join(" ") : "";
    return formatted.slice(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const isValidCardNumber = (number: string) => {
    return /^(\d{4}\s?){3}\d{4}$/.test(number);
  };

  const isValidExpiry = (expiry: string) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
  };

  const isValidCVV = (cvv: string) => {
    return /^\d{3}$/.test(cvv);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["rgba(252, 9, 76, 0.8)", "transparent"]}
        style={styles.gradient}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Профиль</Text>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Назад</Text>
        </Pressable>
      </View>

      <View style={styles.profileInfo}>
        <Pressable onPress={pickImage}>
          <Image style={styles.avatar} source={{ uri: avatarUri }} />
        </Pressable>
        <Text style={styles.name}>
          {currentUser?.username || "Пользователь"}
        </Text>
        <Text style={styles.email}>
          {currentUser?.email || "email@example.com"}
        </Text>
      </View>

      <View style={styles.cardSection}>
        <Text style={styles.sectionTitle}>Данные карты</Text>
        {currentUser?.creditCard ? (
          <View>
            <Text style={styles.cardInfo}>
              Номер карты: **** **** ****{" "}
              {currentUser.creditCard.number.slice(-4)}
            </Text>
            <Pressable
              style={styles.removeCardButton}
              onPress={handleRemoveCard}
            >
              <Text style={styles.removeCardButtonText}>Удалить карту</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={styles.addCardButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addCardButtonText}>Добавить карту</Text>
          </Pressable>
        )}
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Выйти</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Добавить карту</Text>
            <TextInput
              style={styles.input}
              placeholder="Номер карты"
              placeholderTextColor="#999"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              keyboardType="numeric"
              maxLength={19}
            />
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              placeholderTextColor="#999"
              value={cardExpiry}
              onChangeText={(text) => setCardExpiry(formatExpiry(text))}
              keyboardType="numeric"
              maxLength={5}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              placeholderTextColor="#999"
              value={cardCVV}
              onChangeText={setCardCVV}
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
            />
            <Pressable style={styles.modalAddButton} onPress={handleAddCard}>
              <Text style={styles.modalAddButtonText}>Добавить карту</Text>
            </Pressable>
            <Pressable
              style={styles.modalCancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>Отмена</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1819",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FC094C",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    color: "#CCCCCC",
    fontSize: 16,
  },
  cardSection: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardInfo: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#2C2C2C",
    color: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  addCardButton: {
    backgroundColor: "#FC094C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addCardButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  removeCardButton: {
    backgroundColor: "#FC094C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  removeCardButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FC094C",
    paddingVertical: 16,
    marginHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#1B1819",
    padding: 24,
    borderRadius: 16,
    width: "80%",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalAddButton: {
    backgroundColor: "#FC094C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  modalAddButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCancelButton: {
    backgroundColor: "#2C2C2C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  modalCancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default ProfileScreen;
