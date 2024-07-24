import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width: screenWidth } = Dimensions.get("window");

const sessions = [
  { date: "2024-07-25", times: ["10:00", "13:30", "17:00", "20:30"] },
  { date: "2024-07-26", times: ["11:00", "14:30", "18:00", "21:30"] },
  { date: "2024-07-27", times: ["09:30", "13:00", "16:30", "20:00"] },
  { date: "2024-07-28", times: ["10:30", "14:00", "17:30", "21:00"] },
  { date: "2024-07-29", times: ["11:30", "15:00", "18:30", "22:00"] },
];

export default function SessionSelectionScreen({ route, navigation }: any) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { movieName } = route.params;

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigation.navigate("SeatSelectionScreen", {
        movieName,
        selectedDate,
        selectedTime,
      });
    } else {
      alert("Пожалуйста, выберите дату и время сеанса");
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
        <Text style={styles.title}>Выбор сеанса</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.movieTitle}>{movieName}</Text>
        {sessions.map((session) => (
          <View key={session.date} style={styles.sessionContainer}>
            <Pressable
              style={[
                styles.dateButton,
                selectedDate === session.date && styles.selectedDate,
              ]}
              onPress={() => handleDateSelection(session.date)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === session.date && styles.selectedDateText,
                ]}
              >
                {new Date(session.date).toLocaleDateString("ru-RU", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </Pressable>
            <View style={styles.timesContainer}>
              {session.times.map((time) => (
                <Pressable
                  key={time}
                  style={[
                    styles.timeButton,
                    selectedDate === session.date &&
                      selectedTime === time &&
                      styles.selectedTime,
                  ]}
                  onPress={() => handleTimeSelection(time)}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedDate === session.date &&
                        selectedTime === time &&
                        styles.selectedTimeText,
                    ]}
                  >
                    {time}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <Pressable style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Продолжить</Text>
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
    padding: 20,
  },
  movieTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sessionContainer: {
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedDate: {
    backgroundColor: "#FF6B00",
  },
  dateText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  selectedDateText: {
    fontWeight: "bold",
  },
  timesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: (screenWidth - 60) / 3,
  },
  selectedTime: {
    backgroundColor: "#FF6B00",
  },
  timeText: {
    color: "white",
    textAlign: "center",
  },
  selectedTimeText: {
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#FF6B00",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
