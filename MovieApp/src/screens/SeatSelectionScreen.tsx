import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../context/AuthContext";

const { width } = Dimensions.get("window");
const seatSize = Math.floor(width / 10);

export default function SeatSelectionScreen({ route, navigation }: any) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const { currentUser } = useAuth();
  const { movieName, selectedDate, selectedTime } = route.params;

  const seatLayout = [
    { row: "A", seats: 8 },
    { row: "B", seats: 8 },
    { row: "C", seats: 8 },
    { row: "D", seats: 8 },
    { row: "E", seats: 8 },
    { row: "F", seats: 8 },
    { row: "G", seats: 8 },
  ];

  const handleSeatSelection = (seat: string) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  const renderSeat = (row: string, seatNumber: number) => {
    const seatId = `${row}${seatNumber}`;
    const isSelected = selectedSeats.includes(seatId);

    return (
      <Pressable
        key={seatId}
        onPress={() => handleSeatSelection(seatId)}
        style={[styles.seat, isSelected && styles.selectedSeat]}
      >
        <Text style={[styles.seatText, isSelected && styles.selectedSeatText]}>
          {seatNumber}
        </Text>
      </Pressable>
    );
  };

  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      Alert.alert("Выберите место", "Пожалуйста, выберите хотя бы одно место.");
      return;
    }

    if (!currentUser?.creditCard) {
      Alert.alert(
        "Карта не добавлена",
        "Для оплаты билетов необходимо добавить карту в профиле.",
        [
          {
            text: "Добавить карту",
            onPress: () => navigation.navigate("Profile"),
          },
          {
            text: "Отмена",
            style: "cancel",
          },
        ]
      );
    } else {
      navigation.navigate("TicketPurchase", {
        selectedSeats,
        movieName,
        selectedDate,
        selectedTime,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.title}>Выбор мест</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.movieInfo}>{movieName}</Text>
        <Text style={styles.sessionInfo}>
          {new Date(selectedDate).toLocaleDateString("ru-RU", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text style={styles.sessionInfo}>Сеанс: {selectedTime}</Text>
        <View style={styles.screen}>
          <Text style={styles.screenText}>Экран</Text>
        </View>
        <View style={styles.seatContainer}>
          {seatLayout.map((row) => (
            <View key={row.row} style={styles.row}>
              <Text style={styles.rowLabel}>{row.row}</Text>
              <View style={styles.seats}>
                {[...Array(row.seats)].map((_, index) =>
                  renderSeat(row.row, index + 1)
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.seat, styles.availableSeat]} />
          <Text style={styles.legendText}>Доступно</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.seat, styles.selectedSeat]} />
          <Text style={styles.legendText}>Выбрано</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.seat, styles.occupiedSeat]} />
          <Text style={styles.legendText}>Занято</Text>
        </View>
      </View>
      <Pressable style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>
          Оплатить ({selectedSeats.length}{" "}
          {selectedSeats.length === 1 ? "место" : "места"})
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  movieInfo: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sessionInfo: {
    color: "#CCC",
    fontSize: 16,
    marginBottom: 5,
  },
  screen: {
    width: "80%",
    height: 30,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 5,
  },
  screenText: {
    color: "#fff",
    fontSize: 12,
  },
  seatContainer: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  rowLabel: {
    color: "#fff",
    marginRight: 10,
    fontSize: 16,
    width: 20,
    textAlign: "center",
  },
  seats: {
    flexDirection: "row",
  },
  seat: {
    width: seatSize,
    height: seatSize,
    margin: 2,
    backgroundColor: "#444",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  selectedSeat: {
    backgroundColor: "#FF6B00",
  },
  occupiedSeat: {
    backgroundColor: "#222",
  },
  availableSeat: {
    backgroundColor: "#444",
  },
  seatText: {
    color: "white",
    fontSize: 12,
  },
  selectedSeatText: {
    fontWeight: "bold",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 12,
  },
  payButton: {
    backgroundColor: "#FF6B00",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  payButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
