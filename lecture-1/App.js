import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-web";

const title = "Home";

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>{title}</Text>
        <Text>{title}</Text>
        <Text>{title}</Text>
        <Text>{title}</Text>
        <Text>{title}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
